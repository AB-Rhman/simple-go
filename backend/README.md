# Task Management Backend Service

## Overview

This is a robust, production-ready backend service built with Go that provides a RESTful API for task management. The service is designed to be scalable, maintainable, and follows modern best practices in software development.

## Features

- **RESTful API**: Clean and intuitive API endpoints for task management
- **PostgreSQL Database**: Reliable and scalable data storage
- **Docker Support**: Easy deployment and containerization
- **Environment Configuration**: Flexible configuration through environment variables
- **Health Checks**: Built-in health monitoring
- **Logging**: Comprehensive logging for debugging and monitoring
- **Error Handling**: Robust error handling and reporting
- **Database Migrations**: Automated database schema management
- **API Documentation**: Clear endpoint documentation
- **Testing**: Comprehensive test coverage

## Technical Stack

- **Language**: Go 1.24
- **Framework**: Gorilla Mux (HTTP router)
- **Database**: PostgreSQL 15
- **Container**: Docker & Docker Compose
- **Testing**: Go's built-in testing framework
- **Documentation**: Markdown-based documentation

## Project Structure

```
backend/
├── main.go           # Main application entry point and server setup
├── Dockerfile        # Multi-stage Docker build configuration
├── docker-compose.yml # Service orchestration and database setup
├── go.mod           # Go module definition and dependencies
├── go.sum           # Go module checksums
├── Makefile         # Build and development automation
├── handlers/        # HTTP request handlers and business logic
│   ├── task.go      # Task-related request handlers
│   └── middleware.go # HTTP middleware components
├── models/          # Data models and structures
│   └── task.go      # Task model definition
└── db/             # Database operations and migrations
    ├── init.go      # Database initialization
    └── migrations/  # Database migration files
```

## API Documentation

### Task Management Endpoints

#### Get All Tasks
```http
GET /api/tasks
```
Returns a list of all tasks in the system.

**Response:**
```json
{
    "tasks": [
        {
            "id": 1,
            "title": "Example Task",
            "description": "Task description",
            "status": "pending",
            "created_at": "2024-03-20T10:00:00Z"
        }
    ]
}
```

#### Create Task
```http
POST /api/tasks
```
Creates a new task.

**Request Body:**
```json
{
    "title": "New Task",
    "description": "Task description"
}
```

#### Delete Task
```http
DELETE /api/tasks/{id}
```
Deletes a task by its ID.

## Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 8080 |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | postgres |
| DB_NAME | Database name | tasks |
| LOG_LEVEL | Logging level | info |

## Development Workflow

1. **Setup Development Environment**
   ```bash
   # Clone the repository
   git clone https://github.com/AB-Rhman/simple-go
   cd backend

   # Install dependencies
   go mod download
   ```

2. **Run Locally**
   ```bash
   # Start PostgreSQL
   docker-compose up postgres -d

   # Run the application
   go run main.go
   ```

3. **Run Tests**
   ```bash
   # Run all tests
   go test ./...

   # Run tests with coverage
   go test -coverprofile=coverage.out ./...
   go tool cover -html=coverage.out
   ```

4. **Build and Deploy**
   ```bash
   # Build the application
   make build

   # Run with Docker Compose
   docker-compose up --build
   ```

## Docker Configuration

The project uses a multi-stage Docker build process:

1. **Build Stage**
   - Uses `golang:1.24-alpine`
   - Compiles the application
   - Optimizes for production

2. **Production Stage**
   - Uses `alpine:latest`
   - Minimal image size
   - Includes only necessary components

## Security Features

1. **Input Validation**
   - Request payload validation
   - SQL injection prevention
   - XSS protection

2. **Authentication & Authorization**
   - JWT-based authentication (planned)
   - Role-based access control (planned)

3. **Data Protection**
   - Environment variable encryption
   - Secure database credentials
   - HTTPS enforcement (in production)

## Monitoring and Logging

1. **Application Logs**
   - Request/response logging
   - Error tracking
   - Performance metrics

2. **Health Checks**
   - Database connectivity
   - API endpoint availability
   - System resource monitoring

## Best Practices

1. **Code Quality**
   - Go code style guidelines
   - Error handling patterns
   - Documentation standards

2. **Security**
   - Regular dependency updates
   - Security scanning
   - Access control

3. **Performance**
   - Database query optimization
   - Connection pooling
   - Caching strategies

## Troubleshooting Guide

### Common Issues

1. **Database Connection**
   ```bash
   # Check database status
   docker-compose ps postgres
   
   # View database logs
   docker-compose logs postgres
   ```

2. **Application Issues**
   ```bash
   # Check application logs
   docker-compose logs backend
   
   # Verify environment variables
   docker-compose config
   ```

3. **Network Issues**
   ```bash
   # Check network connectivity
   docker network inspect app-network
   
   # Verify port availability
   netstat -tulpn | grep 8080
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 