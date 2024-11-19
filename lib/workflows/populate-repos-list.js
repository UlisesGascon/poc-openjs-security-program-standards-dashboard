import { ensureGithubToken } from '../utils/index.js'
import { getAllProjects, overwriteProjects } from '../store/index.js'
import { Octokit } from 'octokit'
import { getConfig } from '../../config/index.js'

const { relevantRepoProperties } = getConfig()
const extractRelevantData = repo => {
  const relevantData = {}
  relevantRepoProperties.forEach(property => {
    relevantData[property] = repo[property]
  })
  return relevantData
}

export async function populateRepositories (options = {}) {
  console.log('Checking requirements...')
  ensureGithubToken()
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })
  const projects = getAllProjects()
  const projectsUpdated = JSON.parse(JSON.stringify(projects))

  console.log('Starting population...')
  // iterate over each project
  for (const project of projectsUpdated) {
    console.log(`Populating repositories for project: ${project.name}`)
    for (const gitHubOrg of project.githubOrgs) {
      // Check for Org or User and collect the first 100 repos
      const repoList = []
      const { data: repos } = await octokit.rest.repos.listForOrg({ org: gitHubOrg.name, type: 'public', per_page: 100 })
      console.log(`Got ${repos.length} repos for org: ${gitHubOrg.name}`)
      repoList.push(...repos.map(extractRelevantData))

      // Check if the org has more than 100 repos and requires pagination management
      if (repoList.length === 100) {
        let page = 2
        let hasMore = true
        while (hasMore) {
          console.log(`Getting page ${page} for org: ${gitHubOrg.name}`)
          const { data: repos, headers } = await octokit.rest.repos.listForOrg({ org: gitHubOrg.name, type: 'public', per_page: 100, page })
          console.log(`Got ${repos.length} repos for org: ${gitHubOrg.name}`)
          repoList.push(...repos.map(extractRelevantData))
          hasMore = headers.link.includes('rel="next"')
          page += 1
        }
      }

      // Ignore archived
      gitHubOrg.repositories = repoList.filter(entity => !entity.archived)
      console.log(`Populating repositories for GitHub org: ${gitHubOrg.name}`)
    }
  }
  console.log('Writing updated projects to disk...')
  overwriteProjects(projectsUpdated)
  console.log('Population completed')
}
