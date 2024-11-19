export function checkWebCommitSignOff (projects, checks) {
  checks.webCommitSignOff = {
    name: 'Web Commit Sign-off',
    description: 'Github Org Requires Commit Sign-off for Web-Based Commits',
    level: {
      incubating: 'recommended',
      graduated: 'recommended',
      retiring: 'recommended'
    },
    url: 'https://openjs-security-program-standards.netlify.app/details/item-62',
    projects: {}
  }

  for (const project of projects) {
    checks.webCommitSignOff.projects[project.name] = {}

    let totalRepos = 0
    let nonCompliantRepos = 0
    for (const gitHubOrg of project.githubOrgs) {
      totalRepos += gitHubOrg.repositories.length
      nonCompliantRepos = gitHubOrg.repositories.filter(repo => !repo.web_commit_signoff_required).length

      if (nonCompliantRepos > 0) {
        const percentage = (nonCompliantRepos / totalRepos) * 100
        checks.webCommitSignOff.projects[project.name].globalAchievement = false
        checks.webCommitSignOff.projects[project.name].rationale = `There are ${nonCompliantRepos} (${percentage.toFixed(2)}%) repositories that do not require commit sign-off for web-based commits.`
      } else {
        checks.webCommitSignOff.projects[project.name].globalAchievement = true
        checks.webCommitSignOff.projects[project.name].rationale = 'All repositories require commit sign-off for web-based commits.'
      }
    }
  }
}
