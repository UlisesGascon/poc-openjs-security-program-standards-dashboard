import { getConfig } from '../../config/index.js'
import { isDateWithinPolicy } from '../utils/index.js'

const { generalExpirationPolicy } = getConfig()

export function checkSecureSoftwareDesignTraining ({ projects, checks, alerts, tasks }) {
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

      // Include tasks
      tasks[project.name] = tasks[project.name] || {}
      tasks[project.name].secureSoftwareDesignTraining = {
        name: 'Train or renew the certification for the team on Secure Software Design',
        description: 'At least One Primary Maintainer has taken TBD Training on Secure Software Design or Equivalent',
        priority: 'critical',
        url: 'https://openjs-security-program-standards.netlify.app/details/item-1',
        category: checks.secureSoftwareDesignTraining.category
      }

      // Include alerts
      alerts[project.name] = alerts[project.name] || {}
      alerts[project.name].secureSoftwareDesignTraining = {
        name: 'Lack of Training or validation on Secure Software Design',
        description: 'At least One Primary Maintainer has taken TBD Training on Secure Software Design or Equivalent',
        priority: 'critical',
        url: 'https://openjs-security-program-standards.netlify.app/details/item-1',
        category: checks.secureSoftwareDesignTraining.category
      }
    }
  }
}
