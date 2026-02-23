# Contributing to Bank API Test Harness

## Adding a New Bank Mock

To add support for a new bank (e.g., FNB):

1. **Create bank directory:**
   ```bash
   mkdir -p mocks/mappings/fnb
   ```

2. **Add mock files** (copy from existing bank and modify):
   ```bash
   # Account balance mock
   mocks/mappings/fnb/account-balance.json
   
   # Payment idempotent mock
   mocks/mappings/fnb/payment-idempotent.json
   
   # Service unavailable mock
   mocks/mappings/fnb/service-unavailable.json
   
   # Throttled response mock
   mocks/mappings/fnb/throttled.json
   ```

3. **Example payment mock structure:**
   ```json
   {
     "request": {
       "method": "POST",
       "url": "/api/v1/payments",
       "headers": {
         "Idempotency-Key": {
           "equalTo": "fnb-abc-123"
         }
       }
     },
     "response": {
       "status": 201,
       "jsonBody": {
         "paymentId": "fnb-pay-789",
         "status": "PENDING",
         "idempotent": true,
         "bank": "FNB"
       }
     }
   }
   ```

4. **Restart WireMock:**
   ```bash
   npm run mock:stop
   npm run mock:start
   ```

## Adding New Test Scenarios

1. Create test file in `tests/performance/`:
   ```javascript
   import http from "k6/http";
   import { check } from "k6";
   
   const BASE_URL = __ENV.API_URL || "http://localhost:8080";
   
   export default function() {
     // Your test logic
   }
   ```

2. Add npm script to `package.json`:
   ```json
   "test:yourtest": "k6 run tests/performance/yourtest.test.js"
   ```

3. Update GitHub Actions workflow if needed.

## Customizing Mock Responses

WireMock supports:
- **Status codes**: Change `"status": 201` to any HTTP code
- **Delays**: Add `"fixedDelayMilliseconds": 2000`
- **Conditional matching**: Use `"matches"`, `"contains"`, `"equalTo"`
- **Response templating**: Use Handlebars syntax

Example with delay:
```json
{
  "response": {
    "status": 201,
    "fixedDelayMilliseconds": 2000,
    "jsonBody": { ... }
  }
}
```

## Pull Request Guidelines

- Ensure all tests pass: `npm test`
- Follow existing code structure
- Update README if adding new features
- Keep mocks realistic to actual bank APIs

## Questions?

Open an issue for discussion before major changes.
