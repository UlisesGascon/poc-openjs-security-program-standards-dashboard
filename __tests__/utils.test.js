import { ensureGithubToken, isDateWithinPolicy } from '../lib/utils/index.js'

describe('ensureGithubToken', () => {
  let originalGithubToken

  beforeAll(() => {
    originalGithubToken = process.env.GITHUB_TOKEN
  })

  afterAll(() => {
    process.env.GITHUB_TOKEN = originalGithubToken
  })

  it('should throw an error if GITHUB_TOKEN is required', () => {
    delete process.env.GITHUB_TOKEN
    expect(() => ensureGithubToken()).toThrow('GITHUB_TOKEN is required')
  })

  it('should not throw an error if GITHUB_TOKEN is set', () => {
    process.env.GITHUB_TOKEN = 'test-token'
    expect(() => ensureGithubToken()).not.toThrow()
  })
})

describe('isDateWithinPolicy', () => {
  it('should return true for date within 90 days', () => {
    const startDate = new Date().toISOString()
    const policy = '90d'
    expect(isDateWithinPolicy(startDate, policy)).toBe(true)
  })

  it('should return false for date outside 90 days', () => {
    const startDate = new Date(new Date().setDate(new Date().getDate() - 91)).toISOString()
    const policy = '90d'
    expect(isDateWithinPolicy(startDate, policy)).toBe(false)
  })

  it('should return true for date within 3 months', () => {
    const startDate = new Date().toISOString()
    const policy = '3m'
    expect(isDateWithinPolicy(startDate, policy)).toBe(true)
  })

  it('should return false for date outside 3 months', () => {
    const startDate = new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString()
    const policy = '3m'
    expect(isDateWithinPolicy(startDate, policy)).toBe(false)
  })

  it('should return true for date within 1 quarter', () => {
    const startDate = new Date().toISOString()
    const policy = '1q'
    expect(isDateWithinPolicy(startDate, policy)).toBe(true)
  })

  it('should throw an error for unsupported policy format', () => {
    const startDate = new Date().toISOString()
    const policy = '10y' // Unsupported format
    expect(() => isDateWithinPolicy(startDate, policy)).toThrow('Unsupported policy format')
  })
})
