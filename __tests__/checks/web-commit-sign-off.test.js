import { checkWebCommitSignOff } from '../../lib/checks/web-commit-sign-off.js'

describe('checkWebCommitSignOff', () => {
  let projects
  let checks
  let tasks
  let alerts

  beforeEach(() => {
    projects = [
      {
        name: 'Project1',
        githubOrgs: [
          {
            repositories: [
              { 
                web_commit_signoff_required: true,
                full_name: 'org1/repo',
                html_url: 'https://github.com/org1/repo'
              },
              { 
                web_commit_signoff_required: false,
                full_name: 'org1/repo2',
                html_url: 'https://github.com/org1/repo2'
              }
            ]
          }
        ]
      },
      {
        name: 'Project2',
        githubOrgs: [
          {
            repositories: [
              { 
                web_commit_signoff_required: true,
                full_name: 'org2/repo',
                html_url: 'https://github.com/org1/repo'
              },
              { 
                web_commit_signoff_required: true,
                full_name: 'org2/repo2',
                html_url: 'https://github.com/org1/repo2'
              }
            ]
          }
        ]
      }
    ]
    checks = {}
    tasks = {}
    alerts = {}
  })

  it('should update checks with project compliance data', () => {
    checkWebCommitSignOff({ projects, checks, tasks, alerts })
    expect(checks).toMatchSnapshot()
    expect(tasks).toMatchSnapshot()
    expect(alerts).toMatchSnapshot()
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
    checkWebCommitSignOff({ projects, checks, tasks, alerts })
    expect(checks).toMatchSnapshot()
    expect(tasks).toMatchSnapshot()
    expect(alerts).toMatchSnapshot()
  })
})