/* eslint-disable no-fallthrough */
/**
 * @author heart
 * @description
 * @Date 2022-06-04
 */

function getEmail(email: string): string {
  let len = 0,
    suffix = '',
    prefix = ''

  while (len <= email.length) {
    switch (email.charAt(len)) {
      case '+': {
        while (email.charAt(len) !== '@' && len <= email.length) {
          len++
        }
      }
      case '@': {
        suffix = email.substring(len, email.length)
      }
      case '.': {
        break
      }
      default: {
        prefix += email.charAt(len)
      }
    }
    len++
  }

  return prefix + suffix
}

export function numUniqueEmails(emails: string[]): number {
  const set = new Set<string>()

  for (let i = 0; i < emails.length; i++) {
    const email = getEmail(emails[i])
    set.add(email)
  }
  return set.size
}

console.log(
  numUniqueEmails([
    'test.email+alex@leetcode.com',
    'test.e.mail+bob.cathy@leetcode.com',
    'testemail+david@lee.tcode.com',
  ])
)
