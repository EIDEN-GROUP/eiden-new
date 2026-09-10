/* Sliding-window in-memory rate limiter.
   Enough for a contact form on serverless; upgrade to Upstash/Redis
   if abuse ever spans instances. */

type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket);
    return true;
  }
  bucket.hits.push(now);
  buckets.set(key, bucket);
  // Keep memory bounded on long-lived instances.
  if (buckets.size > 2000) {
    const oldest = buckets.keys().next().value;
    if (oldest) buckets.delete(oldest);
  }
  return false;
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}
