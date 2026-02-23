import http from "k6/http";
import { sleep, check } from "k6";

const BASE_URL = __ENV.API_URL || "http://localhost:8080";

export default function retryBackoffTest() {
  let retries = 0;
  let delay = 1;

  while (retries < 3) {
    const res = http.get(`${BASE_URL}/api/v1/unavailable`);

    if (res.status === 200) {
      check(res, { "success": r => r.status === 200 });
      break;
    }

    sleep(delay);
    delay *= 2;
    retries++;
  }
}