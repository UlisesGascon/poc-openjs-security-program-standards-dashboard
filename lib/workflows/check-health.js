import { getAllProjects, overwriteChecks, overwriteAlerts, overwriteTasks } from '../store/index.js'
import { checkWebCommitSignOff } from '../checks/web-commit-sign-off.js'
import { checkOwaspTop10Training } from '../checks/owasp-top-10-training.js'
import { checkSecureSoftwareDesignTraining } from '../checks/secure-software-design-training.js'
import { checkNpmMfaEnabled } from '../checks/npm-mfa-enabled.js'

export async function checkHealth (options = {}) {
  console.log('Checking requirements...')
  const checks = {}
  const alerts = {}
  const tasks = {}
  const projects = getAllProjects()
  console.log('Checking project health...')
  checkWebCommitSignOff({ projects, checks, alerts, tasks })
  checkOwaspTop10Training({ projects, checks, alerts, tasks })
  checkSecureSoftwareDesignTraining({ projects, checks, alerts, tasks })
  checkNpmMfaEnabled({ projects, checks, alerts, tasks })
  console.log('Writing updated checks, alerts and tasks to disk...')
  overwriteChecks(checks)
  overwriteAlerts(alerts)
  overwriteTasks(tasks)
  console.log('Check Health completed')
}
