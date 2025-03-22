package main

import (
    "log"
    "net/http"
    "os"
    "github.com/gorilla/mux"
    "github.com/AB-Rhman/simple-go/db"
    "github.com/AB-Rhman/simple-go/handlers"
)

func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        
        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }
        
        next.ServeHTTP(w, r)
    })
}

func main() {
    // Initialize the database
    db.InitDB()

    // Create a new router
    r := mux.NewRouter()

    // Define API routes
    r.HandleFunc("/tasks", handlers.GetTasks).Methods("GET")
    r.HandleFunc("/tasks", handlers.CreateTask).Methods("POST")
    r.HandleFunc("/tasks/{id}", handlers.DeleteTask).Methods("DELETE")

    // Add CORS middleware
    handler := corsMiddleware(r)

    // Start the server
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    log.Printf("Server started on :%s", port)
    log.Fatal(http.ListenAndServe(":"+port, handler))
}