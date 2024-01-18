// utils/cryptoUtils.js
import crypto from 'crypto';

export function generateSHA256(path, queries, secret) {
  const keys = Object.keys(queries).sort();
  let input = path;

  for (const key of keys) {
    input += key + queries[key];
  }

  input = secret + input + secret;

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(input);

  return hmac.digest('hex');
}

export function generateTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}
