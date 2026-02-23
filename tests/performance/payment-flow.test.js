import http from "k6/http";
import { check, sleep } from "k6";
import { randomIntBetween } from "k6";

export const options = {
  vus: 1,
  duration: "30s"
};

const PAYMENTS_API_URL = __ENV.API_URL || "http://localhost:8080/api/v1/payments";

export default function testPaymentFlow() {
  const paymentData = {
    amount: randomIntBetween(100, 5000),
    beneficiary: `Vendor-${randomIntBetween(1, 999)}`,
    currency: "ZAR",
    payment_reference: `REF-${Date.now()}-${__VU}-${__ITER}`
  };
  const res = http.post(
    PAYMENTS_API_URL,
    JSON.stringify(paymentData),
    { headers: { "Content-Type": "application/json" } }
  );

  check(res, {
    "payment accepted": r => r.status === 201
  });

  sleep(0.5);
}