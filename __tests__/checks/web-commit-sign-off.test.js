import { checkWebCommitSignOff } from '../../lib/checks/web-commit-sign-off.js'

describe('checkWebCommitSignOff', () => {
  let projects
  let checks

  beforeEach(() => {
    projects = [
      {
        name: 'Project1',
        githubOrgs: [
          {
            repositories: [
              { web_commit_signoff_required: true },
              { web_commit_signoff_required: false }
            ]
          }
        ]
      },
      {
        name: 'Project2',
        githubOrgs: [
          {
            repositories: [
              { web_commit_signoff_required: true },
              { web_commit_signoff_required: true }
            ]
          }
        ]
      }
    ]
    checks = {}
  })

  it('should update checks with project compliance data', () => {
    checkWebCommitSignOff(projects, checks)
    expect(checks).toMatchSnapshot()
  })

  it('should handle projects with no repositories', () => {
    projects = [
      {
        name: 'Project3',
        githubOrgs: [
          {
            repositories: []
          }
        ]
      }
    ]
    checkWebCommitSignOff(projects, checks)
    expect(checks).toMatchSnapshot()
  })
})
