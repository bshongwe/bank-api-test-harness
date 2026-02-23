import http from "k6/http";
import { check } from "k6";

const BASE_URL = __ENV.API_URL || "http://localhost:8080";

export default function testAuditLog () {
  const res = http.get(`${BASE_URL}/api/v1/accounts/123/balance`);

  check(res, {
    "has request id": r => r.headers["X-Request-Id"] !== undefined
  });
}