import { validateProject } from '../../schemas/project.js';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path'

const projectsFile = join(process.cwd(), 'data/projects.json')
function readData() {
  return JSON.parse(readFileSync(projectsFile, 'utf-8'))
}

function writeData(data) {
    writeFileSync(projectsFile, JSON.stringify(data, null, 2))
}

export function getProjectByName(name, projects=readData()) {
  return projects.find((project) => project.name === name)
}

export function addProject(project) {
  validateProject(project)
  const projects = readData()
  const exist = getProjectByName(project.name, projects)
    if (exist) {
        throw new Error(`Project with name ${project.name} already exists`)
    }
  projects.push(project)
  writeData(projects)
}