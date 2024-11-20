import { checkNpmMfaEnabled } from '../../lib/checks/npm-mfa-enabled.js'
import { isDateWithinPolicy } from '../../lib/utils/index.js'

jest.mock('../../lib/utils/index.js')

describe('checkNpmMfaEnabled', () => {
  let projects
  let checks

  beforeEach(() => {
    projects = [
      {
        name: 'Project1',
        additionalInformation: {
          npmMfaEnabled: {
            globalAchievement: true,
            rationale: 'Setup completed',
            confirmationDate: new Date().toISOString()
          }
        }
      },
      {
        name: 'Project2',
        additionalInformation: {
          npmMfaEnabled: {
            globalAchievement: false,
            rationale: 'Setup not completed',
            confirmationDate: new Date().toISOString()
          }
        }
      }
    ]
    checks = {}
    isDateWithinPolicy.mockReturnValue(true)
  })

  it('should update checks with project compliance data', () => {
    checkNpmMfaEnabled(projects, checks)
    expect(checks).toMatchSnapshot()
  })

  it('should handle projects with no additional information', () => {
    projects = [
      {
        name: 'Project3'
      }
    ]
    checkNpmMfaEnabled(projects, checks)
    expect(checks).toMatchSnapshot()
  })

  it('should handle projects with expired setup', () => {
    projects = [
      {
        name: 'Project4',
        additionalInformation: {
          npmMfaEnabled: {
            globalAchievement: true,
            rationale: 'Setup completed',
            confirmationDate: new Date().toISOString()
          }
        }
      }
    ]
    isDateWithinPolicy.mockReturnValue(false)
    checkNpmMfaEnabled(projects, checks)
    expect(checks).toMatchSnapshot()
  })
})
