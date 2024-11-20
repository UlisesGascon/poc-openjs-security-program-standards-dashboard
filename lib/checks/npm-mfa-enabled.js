import { getConfig } from '../../config/index.js'
import { isDateWithinPolicy } from '../utils/index.js'

const { generalExpirationPolicy } = getConfig()

export function checkNpmMfaEnabled ({ projects, checks, tasks, alerts }) {
  checks.npmMfaEnabled = {
    name: 'MFA enabled for npm',
    description: 'Multi Factor Authentication (MFA) Enforced Across the npm Organization',
    level: {
      incubating: 'expected',
      graduated: 'expected',
      retiring: 'expected'
    },
    url: 'https://openjs-security-program-standards.netlify.app/details/item-3',
    projects: {},
    category: 'user authentication'
  }

  for (const project of projects) {
    checks.npmMfaEnabled.projects[project.name] = {}
    const mfaDetails = project.additionalInformation?.npmMfaEnabled || {}

    const criteria = mfaDetails.globalAchievement &&
            isDateWithinPolicy(mfaDetails.confirmationDate, generalExpirationPolicy)

    if (criteria) {
      checks.npmMfaEnabled.projects[project.name].globalAchievement = true
      checks.npmMfaEnabled.projects[project.name].rationale = mfaDetails.rationale
    } else {
      checks.npmMfaEnabled.projects[project.name].globalAchievement = false
      checks.npmMfaEnabled.projects[project.name].rationale = 'The team has not completed the configuration or requires a confirmation.'

      // Include tasks
      tasks[project.name] = tasks[project.name] || {}
      tasks[project.name].npmMfaEnabled = {
        name: 'Enable MFA for npm',
        description: 'It is expected to enforce Multi Factor Authentication (MFA) across the npm Organization',
        priority: 'critical',
        url: 'https://openjs-security-program-standards.netlify.app/details/item-3',
        category: checks.npmMfaEnabled.category
      }

      // Include alerts
      alerts[project.name] = alerts[project.name] || {}
      alerts[project.name].npmMfaEnabled = {
        name: 'MFA is disabled or requires confirmation for npm',
        description: 'It is expected to enforce Multi Factor Authentication (MFA) across the npm Organization',
        priority: 'critical',
        url: 'https://openjs-security-program-standards.netlify.app/details/item-3',
        category: checks.npmMfaEnabled.category
      }
    }
  }
}
