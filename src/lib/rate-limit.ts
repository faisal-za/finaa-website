type CacheEntry = {
  count: number
  resetTime: number
}

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export default function rateLimit(options?: Options) {
  const cache = new Map<string, CacheEntry>()
  const interval = options?.interval || 60000
  const maxEntries = options?.uniqueTokenPerInterval || 500

  // Clean up expired entries periodically
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of cache.entries()) {
      if (now > entry.resetTime) {
        cache.delete(key)
      }
    }

    // If cache is too large, remove oldest entries
    if (cache.size > maxEntries) {
      const keysToDelete = Array.from(cache.keys()).slice(0, cache.size - maxEntries)
      keysToDelete.forEach(key => cache.delete(key))
    }
  }, interval)

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const now = Date.now()
        const entry = cache.get(token)

        if (!entry || now > entry.resetTime) {
          // Create new entry or reset expired one
          cache.set(token, { count: 1, resetTime: now + interval })
          resolve()
          return
        }

        if (entry.count >= limit) {
          reject(new Error('Rate limit exceeded'))
          return
        }

        entry.count += 1
        cache.set(token, entry)
        resolve()
      }),
  }
}