import { add, parseISO, isBefore } from 'date-fns'

export function ensureGithubToken () {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is required')
  }
}

export function isDateWithinPolicy (targetDate, policy) {
  const targetDateObj = parseISO(targetDate) // Parse ISO string into Date object
  let expirationDate

  // Handle expiration policy
  if (policy.endsWith('d')) {
    const days = parseInt(policy.replace('d', ''), 10)
    expirationDate = add(targetDateObj, { days })
  } else if (policy.endsWith('m')) {
    const months = parseInt(policy.replace('m', ''), 10)
    expirationDate = add(targetDateObj, { months })
  } else if (policy.endsWith('q')) {
    const quarters = parseInt(policy.replace('q', ''), 10)
    expirationDate = add(targetDateObj, { months: quarters * 3 })
  } else {
    throw new Error('Unsupported policy format')
  }

  const currentDate = new Date() // Get current date
  return isBefore(currentDate, expirationDate) // Check if current date is before expiration
}
