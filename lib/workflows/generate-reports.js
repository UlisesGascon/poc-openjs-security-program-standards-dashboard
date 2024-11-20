import ejs from 'ejs'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { getAllProjects, getAllChecks, getAllTasks, getAllAlerts } from '../store/index.js'
import { getConfig } from '../../config/index.js'

const now = new Date().toISOString()
const { reportsPath, checksCategories } = getConfig()

const foundationReportTpl = readFileSync(join(process.cwd(), 'templates/foundation_report.ejs'), 'utf-8')
const projectReportTpl = readFileSync(join(process.cwd(), 'templates/project_report.ejs'), 'utf-8')
const projectAlertsTpl = readFileSync(join(process.cwd(), 'templates/project_alerts.ejs'), 'utf-8')
const projectTasksTpl = readFileSync(join(process.cwd(), 'templates/project_tasks.ejs'), 'utf-8')

const projectsReportsPath = join(reportsPath, 'projects')

const helpers = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  getReportGenerationTime: () => now
}

const projects = getAllProjects()
const checks = getAllChecks()
const alerts = getAllAlerts()
const tasks = getAllTasks()

const globalInformation = {
  generationTime: new Date().toISOString(),
  totalProjects: 0,
  totalGithubOrganizations: 0,
  totalRepositories: 0,
  totalChecksImplemented: Object.keys(checks).length,
  totalChecksDefined: 74,
  checksCategories,
  checkListUrl: 'https://docs.google.com/spreadsheets/d/1GwIsAudAn89xv9DAbr1HUaY4KEVBsYfg--_1cW0uIB0/edit?gid=0#gid=0',
  checkListUrlText: 'OpenJS Security Compliance Standard v1.0',
  complianceStandardUrl: 'https://openjs-security-program-standards.netlify.app/'
}

export async function generateReports (options = {}) {
  console.log('Generating reports...')
  for (const project of projects) {
    const projectReport = ejs.render(projectReportTpl, {
      project,
      checks,
      helpers,
      context: {
        projectName: project.name
      }
    })
    writeFileSync(join(projectsReportsPath, `${project.name}_report.md`), projectReport)

    const projectAlerts = ejs.render(projectAlertsTpl, { project, alerts: alerts[project.name] || {}, helpers })
    writeFileSync(join(projectsReportsPath, `${project.name}_alerts.md`), projectAlerts)

    const projectTasks = ejs.render(projectTasksTpl, { project, tasks: tasks[project.name] || {}, helpers })
    writeFileSync(join(projectsReportsPath, `${project.name}_tasks.md`), projectTasks)

    // Global Metrics
    globalInformation.totalProjects++
    globalInformation.totalGithubOrganizations += project.githubOrgs.length
    globalInformation.totalRepositories += project.githubOrgs.reduce((acc, org) => acc + org.repositories.length, 0)
  }

  // @TODO: Export global Metrics to a file
  const foundationReport = ejs.render(foundationReportTpl, { projects, checks, helpers, globalInformation })
  writeFileSync(join(reportsPath, 'foundation_dashboard.md'), foundationReport)

  console.log('Reports generated')
}
