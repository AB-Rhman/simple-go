package main

import (
    "log"
    "net/http"
    "os"
    "github.com/gorilla/mux"
    "github.com/AB-Rhman/simple-go/db"
    "github.com/AB-Rhman/simple-go/handlers"
)

func main() {
    // Initialize the database
    db.InitDB()

    // Create a new router
    r := mux.NewRouter()

    // Define API routes
    r.HandleFunc("/tasks", handlers.GetTasks).Methods("GET")
    r.HandleFunc("/tasks", handlers.CreateTask).Methods("POST")
    r.HandleFunc("/tasks/{id}", handlers.DeleteTask).Methods("DELETE")

    // Start the server
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    log.Printf("Server started on :%s", port)
    log.Fatal(http.ListenAndServe(":"+port, r))
}