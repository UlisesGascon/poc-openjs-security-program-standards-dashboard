import { validateProject, validateAllProjects } from '../../schemas/project.js'
import { readFileSync, writeFileSync } from 'fs'
import { getConfig } from '../../config/index.js'
import { validateAllChecks } from '../../schemas/check.js'
import { validateAllAlerts } from '../../schemas/alert.js'
import { validateAllTasks } from '../../schemas/task.js'
import { join } from 'path'

const { dataPath } = getConfig()
const projectsFile = join(dataPath, 'projects.json')
const checksFile = join(dataPath, 'checks.json')
const alertsFile = join(dataPath, 'alerts.json')
const tasksFile = join(dataPath, 'tasks.json')

function readData (file) {
  return JSON.parse(readFileSync(file, 'utf-8'))
}

function writeData (data, file) {
  writeFileSync(file, JSON.stringify(data, null, 2))
}

export function getAllProjects () {
  return readData(projectsFile)
}

export function getAllChecks () {
  return readData(checksFile)
}

export function getAllAlerts () {
  return readData(alertsFile)
}

export function getAllTasks () {
  return readData(tasksFile)
}

export function overwriteProjects (projects) {
  validateAllProjects(projects)
  writeData(projects, projectsFile)
}

export function getProjectByName (name, projects = readData(projectsFile)) {
  return projects.find((project) => project.name === name)
}

export function addProject (project) {
  validateProject(project)
  const projects = readData(projectsFile)
  const exist = getProjectByName(project.name, projects)
  if (exist) {
    throw new Error(`Project with name ${project.name} already exists`)
  }
  projects.push(project)
  writeData(projects, projectsFile)
}

export function overwriteChecks (checks) {
  validateAllChecks(checks)
  writeData(checks, checksFile)
}

export function overwriteAlerts (alerts) {
  validateAllAlerts(alerts)
  writeData(alerts, alertsFile)
}

export function overwriteTasks (tasks) {
  validateAllTasks(tasks)
  writeData(tasks, tasksFile)
}
