import { getConfig } from '../../config/index.js'
import { isDateWithinPolicy } from '../utils/index.js'

const { generalExpirationPolicy } = getConfig()

export function checkSecureSoftwareDesignTraining (projects, checks) {
  checks.secureSoftwareDesignTraining = {
    name: 'Secure Software Design Training',
    description: 'At least One Primary Maintainer has taken TBD Training on Secure Software Design',
    level: {
      incubating: 'expected',
      graduated: 'expected',
      retiring: 'expected'
    },
    url: 'https://openjs-security-program-standards.netlify.app/details/item-0',
    projects: {},
    category: 'code quality'
  }

  for (const project of projects) {
    checks.secureSoftwareDesignTraining.projects[project.name] = {}
    const trainingDetails = project.additionalInformation?.secureSoftwareDesignTraining || {}

    const criteria = trainingDetails.globalAchievement &&
            isDateWithinPolicy(trainingDetails.confirmationDate, generalExpirationPolicy)

    if (criteria) {
      checks.secureSoftwareDesignTraining.projects[project.name].globalAchievement = true
      checks.secureSoftwareDesignTraining.projects[project.name].rationale = trainingDetails.rationale
    } else {
      checks.secureSoftwareDesignTraining.projects[project.name].globalAchievement = false
      checks.secureSoftwareDesignTraining.projects[project.name].rationale = 'The team has not completed the required training or requires an update.'
    }
  }
}
