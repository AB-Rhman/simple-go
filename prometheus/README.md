# Prometheus Monitoring Stack

## Overview

This directory contains the configuration files for the Prometheus monitoring stack, including Prometheus server, AlertManager, and alerting rules. The setup provides comprehensive monitoring for the Simple Go application and its infrastructure.

## Components

- **Prometheus Server**: Metrics collection and storage
- **AlertManager**: Alert routing and notification
- **Alert Rules**: Predefined alerting rules for common scenarios

## Configuration Files

### 1. prometheus.yml
Main Prometheus configuration file that defines:
- Global settings
- Scrape configurations
- Service discovery
- Storage settings

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
```

### 2. alertmanager.yml
AlertManager configuration for:
- Alert routing
- Notification channels
- Grouping rules
- Silence rules

```yaml
route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'slack-notifications'
```

### 3. rules.yml
Alerting rules for:
- Resource usage
- Application health
- Infrastructure status
- Custom business metrics

```yaml
groups:
  - name: kubernetes
    rules:
      - alert: HighCPUUsage
        expr: container_cpu_usage_seconds_total > 0.8
        for: 5m
```

## Monitoring Targets

1. **Kubernetes Components**
   - Nodes
   - Pods
   - Services
   - Deployments

2. **Application Metrics**
   - Frontend performance
   - Backend API metrics
   - Database statistics
   - Custom business metrics

3. **Infrastructure**
   - CPU usage
   - Memory consumption
   - Disk I/O
   - Network traffic

## Alerting Rules

### Resource Alerts
- High CPU usage (>80% for 5m)
- High memory usage (>85% for 5m)
- Disk space running low (<10% free)
- Node not ready

### Application Alerts
- High latency (>500ms)
- Error rate spike (>5%)
- Service down
- Database connection issues

### Infrastructure Alerts
- Pod crashloop
- Deployment not ready
- Service endpoint down
- Certificate expiration

## Notification Channels

1. **Slack**
   - Critical alerts
   - Warning notifications
   - Daily summaries

2. **Email**
   - Business hours alerts
   - Weekly reports
   - On-call notifications

3. **PagerDuty**
   - Critical incidents
   - On-call escalations

## Best Practices

1. **Alert Configuration**
   - Use meaningful alert names
   - Set appropriate thresholds
   - Configure proper grouping
   - Define clear severity levels

2. **Monitoring Setup**
   - Regular metric validation
   - Proper labeling
   - Efficient queries
   - Resource optimization

3. **Maintenance**
   - Regular rule reviews
   - Alert tuning
   - Performance optimization
   - Storage management

## Usage

### Starting Prometheus

```bash
prometheus --config.file=prometheus.yml
```

### Starting AlertManager

```bash
alertmanager --config.file=alertmanager.yml
```

### Reloading Configuration

```bash
# Reload Prometheus
curl -X POST http://localhost:9090/-/reload

# Reload AlertManager
curl -X POST http://localhost:9093/-/reload
```

## Troubleshooting

### Common Issues

1. **Prometheus Server**
   ```bash
   # Check Prometheus status
   curl http://localhost:9090/-/healthy
   
   # View targets
   curl http://localhost:9090/api/v1/targets
   ```

2. **AlertManager**
   ```bash
   # Check AlertManager status
   curl http://localhost:9093/-/healthy
   
   # View active alerts
   curl http://localhost:9093/api/v2/alerts
   ```

3. **Configuration Issues**
   ```bash
   # Validate Prometheus config
   promtool check config prometheus.yml
   
   # Validate AlertManager config
   amtool check-config alertmanager.yml
   ```

## Maintenance

### Regular Tasks

1. **Weekly**
   - Review alert rules
   - Check notification channels
   - Validate metrics collection

2. **Monthly**
   - Clean up old data
   - Optimize storage
   - Update configurations

3. **Quarterly**
   - Review alert thresholds
   - Update documentation
   - Performance tuning

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 