import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { readFileSync } from 'fs'
import { join } from 'path'

const projectsSchema = JSON.parse(readFileSync(join(process.cwd(), 'schemas/types/projects.json'), 'utf-8'))

const ajv = new Ajv()
addFormats(ajv)

export function validateProject (project) {
  const validate = ajv.compile(projectsSchema)
  const valid = validate(project)
  if (!valid) {
    throw new Error(validate.errors.map((error) => error.message).join('\n'))
  }
}

export function validateAllProjects (projects) {
  projects.forEach(validateProject)
}
