import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "30s"
};
const PAYMENTS_API_URL = "http://localhost:8080/api/v1/payments";

export default function testPaymentFlow() {
  const paymentData = {
    amount: 1500,
    beneficiary: "Vendor-X"
  };
  const res = http.post(
    PAYMENTS_API_URL,
    JSON.stringify(paymentData),
    { headers: { "Content-Type": "application/json" } }
  );

  check(res, {
    "payment accepted": r => r.status === 201 || r.status === 200
  });

  sleep(1);
}