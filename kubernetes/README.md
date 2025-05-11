# Kubernetes Deployment Documentation

## Overview

This directory contains Kubernetes manifests for deploying the Task Management application. The deployment includes frontend, backend, and PostgreSQL components with proper configuration and networking.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │     │    Backend      │     │   PostgreSQL    │
│   Service       │◄────┤    Service      │◄────┤    Service      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Components

### Frontend
- **Deployment**: 2 replicas
- **Service**: LoadBalancer
- **Resource Limits**:
  - CPU: 250m
  - Memory: 128Mi
- **Resource Requests**:
  - CPU: 100m
  - Memory: 64Mi

### Backend
- **Deployment**: 3 replicas
- **Service**: ClusterIP
- **Resource Limits**:
  - CPU: 500m
  - Memory: 256Mi
- **Resource Requests**:
  - CPU: 250m
  - Memory: 128Mi

### PostgreSQL
- **Deployment**: 1 replica
- **Service**: ClusterIP
- **Persistent Volume**: Yes
- **Resource Limits**:
  - CPU: 500m
  - Memory: 512Mi

## Configuration Files

```
kubernetes/
├── frontend-deployment.yaml    # Frontend deployment configuration
├── frontend-service.yaml       # Frontend service configuration
├── backend-deployment.yaml     # Backend deployment configuration
├── backend-service.yaml        # Backend service configuration
├── postgres-deployment.yaml    # PostgreSQL deployment configuration
├── postgres-service.yaml       # PostgreSQL service configuration
├── configmap.yaml             # Application configuration
└── secret.yaml                # Sensitive data (database credentials)
```

## Environment Variables

### ConfigMap (app-config)
- `PORT`: Backend service port
- `POSTGRES_DB`: Database name
- `POSTGRES_HOST`: Database host

### Secrets (db-secrets)
- `postgres-user`: Database username
- `postgres-password`: Database password

## Deployment Steps

1. **Create ConfigMap and Secrets**
   ```bash
   kubectl apply -f configmap.yaml
   kubectl apply -f secret.yaml
   ```

2. **Deploy PostgreSQL**
   ```bash
   kubectl apply -f postgres-deployment.yaml
   kubectl apply -f postgres-service.yaml
   ```

3. **Deploy Backend**
   ```bash
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f backend-service.yaml
   ```

4. **Deploy Frontend**
   ```bash
   kubectl apply -f frontend-deployment.yaml
   kubectl apply -f frontend-service.yaml
   ```

## Verification

1. **Check Deployments**
   ```bash
   kubectl get deployments
   ```

2. **Check Services**
   ```bash
   kubectl get services
   ```

3. **Check Pods**
   ```bash
   kubectl get pods
   ```

## Scaling

### Frontend
```bash
kubectl scale deployment frontend-deployment --replicas=3
```

### Backend
```bash
kubectl scale deployment backend-deployment --replicas=4
```

## Resource Management

### Resource Quotas
- Frontend: CPU 250m, Memory 128Mi
- Backend: CPU 500m, Memory 256Mi
- PostgreSQL: CPU 500m, Memory 512Mi

### Horizontal Pod Autoscaling
- Frontend: 2-5 replicas
- Backend: 3-6 replicas

## Networking

### Services
- Frontend: LoadBalancer (External access)
- Backend: ClusterIP (Internal access)
- PostgreSQL: ClusterIP (Internal access)

### Ingress (Optional)
- Path-based routing
- SSL termination
- Load balancing

## Storage

### PostgreSQL
- Persistent Volume Claim
- 1Gi storage
- ReadWriteOnce access mode

## Security

1. **Network Policies**
   - Pod-to-pod communication restrictions
   - Service isolation

2. **Secrets Management**
   - Database credentials
   - API keys
   - TLS certificates

3. **RBAC**
   - Service account permissions
   - Role-based access control

## Monitoring

1. **Health Checks**
   - Readiness probes
   - Liveness probes
   - Startup probes

2. **Metrics**
   - Resource usage
   - Application metrics
   - Custom metrics

## Troubleshooting

### Common Issues

1. **Pod Issues**
   ```bash
   # Check pod status
   kubectl describe pod <pod-name>
   
   # Check pod logs
   kubectl logs <pod-name>
   ```

2. **Service Issues**
   ```bash
   # Check service endpoints
   kubectl get endpoints <service-name>
   
   # Check service details
   kubectl describe service <service-name>
   ```

3. **Configuration Issues**
   ```bash
   # Check ConfigMap
   kubectl get configmap app-config -o yaml
   
   # Check Secrets
   kubectl get secret db-secrets -o yaml
   ```

## Best Practices

1. **Resource Management**
   - Set appropriate resource limits
   - Use resource requests
   - Monitor resource usage

2. **Security**
   - Use secrets for sensitive data
   - Implement network policies
   - Regular security audits

3. **High Availability**
   - Multiple replicas
   - Pod anti-affinity
   - Proper health checks

4. **Maintenance**
   - Regular updates
   - Backup procedures
   - Monitoring setup 