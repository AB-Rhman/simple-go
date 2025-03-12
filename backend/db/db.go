package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/AB-Rhman/simple-go/models"
	_ "github.com/lib/pq"
)

var db *sql.DB

func InitDB() {
    var err error
    connStr := fmt.Sprintf(
        "user=%s dbname=%s sslmode=disable password=%s host=%s",
        os.Getenv("POSTGRES_USER"),
        os.Getenv("POSTGRES_DB"),
        os.Getenv("POSTGRES_PASSWORD"),
        os.Getenv("POSTGRES_HOST"),
    )
    db, err = sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }

    // Create tasks table
    _, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL
        );
    `)
    if err != nil {
        log.Fatal(err)
    }
}

func GetAllTasks() ([]models.Task, error) {
    rows, err := db.Query("SELECT id, title FROM tasks")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var tasks []models.Task
    for rows.Next() {
        var task models.Task
        if err := rows.Scan(&task.ID, &task.Title); err != nil {
            return nil, err
        }
        tasks = append(tasks, task)
    }
    return tasks, nil
}

func CreateTask(task models.Task) error {
    _, err := db.Exec("INSERT INTO tasks (title) VALUES ($1)", task.Title)
    return err
}

func DeleteTask(id string) error {
    _, err := db.Exec("DELETE FROM tasks WHERE id = $1", id)
    return err
}