import { getAllProjects, overwriteChecks } from '../store/index.js'
import { checkWebCommitSignOff } from '../checks/web-commit-sign-off.js'
import { checkOwaspTop10Training } from '../checks/owasp-top-10-training.js'
import { checkSecureSoftwareDesignTraining } from '../checks/secure-software-design-training.js'
import { checkNpmMfaEnabled } from '../checks/npm-mfa-enabled.js'

export async function checkHealth (options = {}) {
  console.log('Checking requirements...')
  const checks = {}
  const projects = getAllProjects()
  checkWebCommitSignOff(projects, checks)
  checkOwaspTop10Training(projects, checks)
  checkSecureSoftwareDesignTraining(projects, checks)
  checkNpmMfaEnabled(projects, checks)
  console.log('Writing updated checks to disk...')
  overwriteChecks(checks)

  console.log('Check Health completed')
}
