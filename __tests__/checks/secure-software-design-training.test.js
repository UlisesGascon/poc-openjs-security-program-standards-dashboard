import { checkSecureSoftwareDesignTraining } from '../../lib/checks/secure-software-design-training.js'
import { isDateWithinPolicy } from '../../lib/utils/index.js'

jest.mock('../../lib/utils/index.js')

describe('checkSecureSoftwareDesignTraining', () => {
  let projects
  let checks

  beforeEach(() => {
    projects = [
      {
        name: 'Project1',
        additionalInformation: {
          secureSoftwareDesignTraining: {
            globalAchievement: true,
            rationale: 'Training completed',
            confirmationDate: new Date().toISOString()
          }
        }
      },
      {
        name: 'Project2',
        additionalInformation: {
          secureSoftwareDesignTraining: {
            globalAchievement: false,
            rationale: 'Training not completed',
            confirmationDate: new Date().toISOString()
          }
        }
      }
    ]
    checks = {}
    isDateWithinPolicy.mockReturnValue(true)
  })

  it('should update checks with project compliance data', () => {
    checkSecureSoftwareDesignTraining(projects, checks)
    expect(checks).toMatchSnapshot()
  })

  it('should handle projects with no additional information', () => {
    projects = [
      {
        name: 'Project3'
      }
    ]
    checkSecureSoftwareDesignTraining(projects, checks)
    expect(checks).toMatchSnapshot()
  })

  it('should handle projects with expired training', () => {
    projects = [
      {
        name: 'Project4',
        additionalInformation: {
          secureSoftwareDesignTraining: {
            globalAchievement: true,
            rationale: 'Training completed',
            confirmationDate: new Date().toISOString()
          }
        }
      }
    ]
    isDateWithinPolicy.mockReturnValue(false)
    checkSecureSoftwareDesignTraining(projects, checks)
    expect(checks).toMatchSnapshot()
  })
})
