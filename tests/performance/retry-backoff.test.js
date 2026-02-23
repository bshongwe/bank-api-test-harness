import http from "k6/http";
import { sleep, check } from "k6";

export default function () {
  let retries = 0;
  let delay = 1;

  while (retries < 3) {
    const res = http.get("http://localhost:8080/api/v1/unavailable");

    if (res.status === 200) {
      check(res, { "success": r => r.status === 200 });
      break;
    }

    sleep(delay);
    delay *= 2;
    retries++;
  }
}