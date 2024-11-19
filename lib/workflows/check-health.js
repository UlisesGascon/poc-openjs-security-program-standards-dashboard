import { getAllProjects, overwriteChecks } from '../store/index.js'
import { checkWebCommitSignOff } from '../checks/web-commit-sign-off.js'

export async function checkHealth (options = {}) {
  console.log('Checking requirements...')
  const checks = {}
  const projects = getAllProjects()
  checkWebCommitSignOff(projects, checks)

  console.log('Writing updated checks to disk...')
  overwriteChecks(checks)

  console.log('Check Health completed')
}
