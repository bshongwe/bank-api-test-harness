import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "30s"
};

export default function testPaymentFlow() {
  const res = http.post(
    "http://localhost:8080/api/v1/payments",
    JSON.stringify({
      amount: 1500,
      beneficiary: "Vendor-X"
    }),
    { headers: { "Content-Type": "application/json" } }
  );

  check(res, {
    "payment accepted": r => r.status === 201 || r.status === 200
  });

  sleep(5);
}