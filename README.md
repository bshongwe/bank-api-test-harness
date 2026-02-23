# Bank API Test Harness

[![CI](https://github.com/bshongwe/bank-api-test-harness/actions/workflows/bank-api-tests.yml/badge.svg)](https://github.com/bshongwe/bank-api-test-harness/actions/workflows/bank-api-tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Bank API Test Harness](public/bank-api-test-harness-01.png)

## Why This Project Exists

This repository demonstrates how regulated banking
integrations are tested responsibly using:

- Mocked banking APIs
- Idempotent payment flows
- Controlled retry logic
- Explicit throttling limits
- Audit-ready request tracing

This mirrors real-world expectations of South African
and international banking partners.

## Quick Start

### Prerequisites
- Docker & Docker Compose v2
- [k6](https://k6.io/docs/get-started/installation/) (load testing tool)

### Setup

```bash
# Start WireMock with bank mocks
npm run mock:start

# Run payment flow tests
npm test

# Run specific tests
npm run test:audit
npm run test:retry

# Stop mocks
npm run mock:stop
```

### Environment Configuration

![Bank API Test Harness](public/bank-api-test-harness.png)

Tests support environment-based URLs:

```bash
k6 run -e API_URL=https://staging.example.com tests/performance/payment-flow.test.js
```

### CI/CD

GitHub Actions automatically runs all tests on push and pull requests. See [.github/workflows/bank-api-tests.yml](.github/workflows/bank-api-tests.yml) for details.

## Troubleshooting

### WireMock won't start
```bash
# Check if port 8080 is already in use
lsof -i :8080

# Stop any existing containers
docker compose down

# View logs
docker compose logs wiremock
```

### Tests failing
```bash
# Verify WireMock is running
curl http://localhost:8080/__admin/health

# Check mock mappings are loaded
curl http://localhost:8080/__admin/mappings

# Run tests with verbose output
k6 run --verbose tests/performance/payment-flow.test.js
```

### k6 not found
```bash
# Install k6 (macOS)
brew install k6

# Install k6 (Linux)
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new banks, test scenarios, and customizing mocks.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Responsible Use

⚠️ **IMPORTANT**: This tool is designed for testing against **mock APIs only**.

### Prohibited Uses:
- ❌ Testing against production banking APIs without explicit authorization
- ❌ Load testing third-party services without permission
- ❌ Attempting to bypass security controls
- ❌ Using real customer data or credentials

### Permitted Uses:
- ✅ Local development and testing
- ✅ CI/CD pipeline integration testing
- ✅ Learning banking API integration patterns
- ✅ Internal staging/test environment validation

**By using this tool, you agree to test only against authorized mock or test environments.**