import fs from 'fs'
import { join } from 'path'
import { validateAllProjects } from '../schemas/project.js'
import { validateAllChecks } from '../schemas/check.js'
import { getConfig } from '../config/index.js'

const { dataPath } = getConfig('default')

test('Validate all projects data', () => {
  const projects = JSON.parse(fs.readFileSync(join(dataPath, 'projects.json'), 'utf-8'))
  expect(() => validateAllProjects(projects)).not.toThrow()
})

test('Validate all checks data', () => {
  const checks = JSON.parse(fs.readFileSync(join(dataPath, 'checks.json'), 'utf-8'))
  expect(() => validateAllChecks(checks)).not.toThrow()
})
