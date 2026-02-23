import http from "k6/http";
import { check } from "k6";

export default function testAuditLog () {
  const res = http.get("http://localhost:8080/api/v1/accounts/123/balance");

  check(res, {
    "has request id": r => r.headers["X-Request-Id"] !== undefined
  });
}