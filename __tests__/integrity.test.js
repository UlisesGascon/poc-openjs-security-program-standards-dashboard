import { test } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import { join } from 'node:path'

import { validateAllProjects } from '../schemas/project.js'
import { getConfig } from '../config/index.js'

// Ensure that we use the production configuration
const { dataPath } = getConfig('production')

test('Validate all projects data', () => {
  const projects = JSON.parse(fs.readFileSync(join(dataPath, 'projects.json'), 'utf-8'))
  assert.doesNotThrow(() => validateAllProjects(projects), 'Expected all projects to be valid')
})
