package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/AB-Rhman/simple-go/db"
	"github.com/AB-Rhman/simple-go/models"
	"github.com/gorilla/mux"
)

func GetTasks(w http.ResponseWriter, r *http.Request) {
    tasks, err := db.GetAllTasks()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(tasks)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
    var task models.Task
    if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    if err := db.CreateTask(task); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    w.WriteHeader(http.StatusCreated)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
    id := mux.Vars(r)["id"]
    if err := db.DeleteTask(id); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    w.WriteHeader(http.StatusNoContent)
}