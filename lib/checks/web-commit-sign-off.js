export function checkWebCommitSignOff ({ projects, checks, alerts, tasks }) {
  checks.webCommitSignOff = {
    name: 'Web Commit Sign-off',
    description: 'Github Org Requires Commit Sign-off for Web-Based Commits',
    level: {
      incubating: 'recommended',
      graduated: 'recommended',
      retiring: 'recommended'
    },
    url: 'https://openjs-security-program-standards.netlify.app/details/item-62',
    projects: {},
    category: 'source control'
  }

  // IMPORTANT: As of now, this check is only recommended so no alerts are generated

  for (const project of projects) {
    checks.webCommitSignOff.projects[project.name] = {}

    let totalRepos = 0
    let nonCompliantRepos = []
    for (const gitHubOrg of project.githubOrgs) {
      totalRepos += gitHubOrg.repositories.length
      nonCompliantRepos = nonCompliantRepos.concat(gitHubOrg.repositories.filter(repo => !repo.web_commit_signoff_required))
    }
    const totalNonCompliantRepos = nonCompliantRepos.length

    if (totalNonCompliantRepos > 0) {
      // Achievement details
      const percentage = (totalNonCompliantRepos / totalRepos) * 100
      checks.webCommitSignOff.projects[project.name].globalAchievement = false
      checks.webCommitSignOff.projects[project.name].rationale = `There are ${totalNonCompliantRepos} (${percentage.toFixed(2)}%) repositories that do not require commit sign-off for web-based commits.`

      // Include tasks
      tasks[project.name] = tasks[project.name] || {}
      tasks[project.name].webCommitSignOff = {
        name: 'Enable Commit Sign-off for Web-Based Commits',
        description: 'Enable commit sign-off for web-based commits in all repositories',
        // IMPORTANT: All are low priority as the check is recommended and not expected
        priority: 'low',
        url: 'https://openjs-security-program-standards.netlify.app/details/item-62',
        category: checks.webCommitSignOff.category,
        // Limit the amount of data
        repositories: nonCompliantRepos.map(
          // eslint-disable-next-line camelcase
          ({ full_name, html_url }) => ({ full_name, html_url })
        )
      }
    } else {
      checks.webCommitSignOff.projects[project.name].globalAchievement = true
      checks.webCommitSignOff.projects[project.name].rationale = 'All repositories require commit sign-off for web-based commits.'
    }
  }
}
