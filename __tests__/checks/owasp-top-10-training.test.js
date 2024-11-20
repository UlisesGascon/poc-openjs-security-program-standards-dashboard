import { checkOwaspTop10Training } from '../../lib/checks/owasp-top-10-training.js'
import { isDateWithinPolicy } from '../../lib/utils/index.js'

jest.mock('../../lib/utils/index.js')

describe('checkOwaspTop10Training', () => {
  let projects
  let checks
  let tasks
  let alerts

  beforeEach(() => {
    projects = [
      {
        name: 'Project1',
        additionalInformation: {
          owaspTop10Training: {
            globalAchievement: true,
            rationale: 'Training completed',
            confirmationDate: new Date().toISOString()
          }
        }
      },
      {
        name: 'Project2',
        additionalInformation: {
          owaspTop10Training: {
            globalAchievement: false,
            rationale: 'Training not completed',
            confirmationDate: new Date().toISOString()
          }
        }
      }
    ]
    checks = {}
    tasks = {}
    alerts = {}
    isDateWithinPolicy.mockReturnValue(true)
  })

  it('should update checks with project compliance data', () => {
    checkOwaspTop10Training({ projects, checks, tasks, alerts })
    expect(checks).toMatchSnapshot()
    expect(tasks).toMatchSnapshot()
    expect(alerts).toMatchSnapshot()
  })

  it('should handle projects with no additional information', () => {
    projects = [
      {
        name: 'Project3'
      }
    ]
    checkOwaspTop10Training({ projects, checks, tasks, alerts })
    expect(checks).toMatchSnapshot()
    expect(tasks).toMatchSnapshot()
    expect(alerts).toMatchSnapshot()
  })

  it('should handle projects with expired training', () => {
    projects = [
      {
        name: 'Project4',
        additionalInformation: {
          owaspTop10Training: {
            globalAchievement: true,
            rationale: 'Training completed',
            confirmationDate: new Date().toISOString()
          }
        }
      }
    ]
    isDateWithinPolicy.mockReturnValue(false)
    checkOwaspTop10Training({ projects, checks, tasks, alerts })
    expect(checks).toMatchSnapshot()
    expect(tasks).toMatchSnapshot()
    expect(alerts).toMatchSnapshot()
  })
})
