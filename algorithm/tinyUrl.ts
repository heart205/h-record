/**
 * Encodes a URL to a shortened URL.
 */
const map = new Map<number, string>()
export function encode(longUrl: string): string {
  const number = map.size
  map.set(number, longUrl)
  return 'http://tinyurl.com/' + number
}

/**
 * Decodes a shortened URL to its original URL.
 */
export function decode(shortUrl: string): string {
  const num = shortUrl.split('http://tinyurl.com/')[1]
  return map.get(Number(num)) || ''
}

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */

export {}
