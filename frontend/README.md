# Task Management Frontend

## Overview

This is a modern React-based frontend application for the Task Management system. It provides a user-friendly interface for managing tasks and communicates with the backend API.

## Features

- **Modern UI**: Built with React 18
- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Immediate feedback on task changes
- **Clean Architecture**: Well-organized component structure
- **Nginx Server**: Production-ready web server
- **Docker Support**: Easy deployment and containerization
- **Development Proxy**: Seamless API integration during development

## Technical Stack

- **Framework**: React 18
- **Build Tool**: Create React App
- **Web Server**: Nginx
- **Container**: Docker
- **Package Manager**: npm
- **Development Server**: React Development Server

## Project Structure

```
frontend/
├── public/           # Static files
├── src/             # Source code
│   ├── components/  # React components
│   ├── pages/      # Page components
│   ├── services/   # API services
│   └── styles/     # CSS styles
├── Dockerfile       # Multi-stage Docker build
├── nginx.conf      # Nginx configuration
├── package.json    # Dependencies and scripts
└── .dockerignore   # Docker ignore file
```

## Development

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Docker (optional)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Docker Deployment

### Building the Image

```bash
docker build -t task-management-frontend .
```

### Running the Container

```bash
docker run -p 80:80 task-management-frontend
```

## Nginx Configuration

The application uses Nginx for serving the static files in production. The configuration includes:

- Static file serving
- Gzip compression
- Security headers
- CORS configuration
- API proxy settings

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:8080 |
| PORT | Development server port | 3000 |

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Component Structure

### Pages
- TaskList: Main task management interface
- TaskForm: Task creation and editing
- TaskDetails: Detailed task view

### Components
- TaskCard: Individual task display
- TaskForm: Task input form
- TaskFilter: Task filtering controls
- LoadingSpinner: Loading state indicator
- ErrorMessage: Error display component

## API Integration

The frontend communicates with the backend through the following endpoints:

- `GET /api/tasks`: Fetch all tasks
- `POST /api/tasks`: Create new task
- `DELETE /api/tasks/{id}`: Delete task

## Styling

- CSS Modules for component-specific styles
- Responsive design using flexbox and grid
- Mobile-first approach
- Consistent color scheme and typography

## Performance Optimization

1. **Code Splitting**
   - Route-based code splitting
   - Lazy loading of components

2. **Asset Optimization**
   - Image optimization
   - Font loading optimization
   - CSS/JS minification

3. **Caching**
   - Browser caching
   - Service worker support
   - API response caching

## Security Features

1. **Input Validation**
   - Form validation
   - XSS prevention
   - CSRF protection

2. **API Security**
   - Secure API communication
   - Error handling
   - Rate limiting

## Best Practices

1. **Code Quality**
   - ESLint configuration
   - Prettier formatting
   - Type checking

2. **Performance**
   - Bundle size optimization
   - Lazy loading
   - Image optimization

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

## Troubleshooting

### Common Issues

1. **Development Server**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules
   rm -rf node_modules
   
   # Reinstall dependencies
   npm install
   ```

2. **Build Issues**
   ```bash
   # Clear build directory
   rm -rf build
   
   # Rebuild
   npm run build
   ```

3. **Docker Issues**
   ```bash
   # Rebuild Docker image
   docker build --no-cache -t task-management-frontend .
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 