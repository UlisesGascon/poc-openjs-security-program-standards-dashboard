import { validateProject, validateAllProjects } from '../../schemas/project.js'
import { readFileSync, writeFileSync } from 'fs'
import { getConfig } from '../../config/index.js'
import { validateAllChecks } from '../../schemas/check.js'
import { join } from 'path'

const { dataPath } = getConfig()
const projectsFile = join(dataPath, 'projects.json')
const checksFile = join(dataPath, 'checks.json')

function readData (file) {
  return JSON.parse(readFileSync(file, 'utf-8'))
}

function writeData (data, file) {
  writeFileSync(file, JSON.stringify(data, null, 2))
}

export function getAllProjects () {
  return readData(projectsFile)
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
