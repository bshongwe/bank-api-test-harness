export const thresholds = {
  latency: {
    // latency: percentile thresholds in milliseconds
    //   p95: 95% of requests should complete within this time
    //   p99: 99% of requests should complete within this time
    p95: 700,
    p99: 1200,
  },
  errorRate: 0.01,
  maxRequestsPerMinute: 40,
};