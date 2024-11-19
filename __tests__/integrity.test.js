import { test } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

import { validateAllProjects } from '../schemas/project.js'

test('Validate all projects data', () => {
  const projects = JSON.parse(fs.readFileSync('data/projects.json', 'utf-8'))
  assert.doesNotThrow(() => validateAllProjects(projects), 'Expected all projects to be valid')
})
