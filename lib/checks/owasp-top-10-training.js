import { getConfig } from '../../config'
import { isDateWithinPolicy } from '../utils'

const { generalExpirationPolicy } = getConfig()

export function checkOwaspTop10Training (projects, checks) {
  checks.owaspTop10Training = {
    name: 'OWASP Top 10 Training',
    description: 'At least One Primary Maintainer has taken TBD Training on OWASP Top 10 or Equivalent',
    level: {
      incubating: 'expected',
      graduated: 'expected',
      retiring: 'expected'
    },
    url: 'https://openjs-security-program-standards.netlify.app/details/item-1',
    projects: {}
  }

  for (const project of projects) {
    checks.owaspTop10Training.projects[project.name] = {}
    const trainingDetails = project.additionalInformation?.owaspTop10Training || {}

    const criteria = trainingDetails.globalAchievement &&
            isDateWithinPolicy(trainingDetails.confirmationDate, generalExpirationPolicy)

    if (criteria) {
      checks.owaspTop10Training.projects[project.name].globalAchievement = true
      checks.owaspTop10Training.projects[project.name].rationale = trainingDetails.rationale
    } else {
      checks.owaspTop10Training.projects[project.name].globalAchievement = false
      checks.owaspTop10Training.projects[project.name].rationale = 'The team has not completed the required training or requires an update.'
    }
  }
}
