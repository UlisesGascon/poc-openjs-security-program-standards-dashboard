import { afterAll, jest } from '@jest/globals'
import fs from 'fs'
import { join } from 'path'
import inquirer from 'inquirer'
import { getConfig } from '../../config/index.js'
import { runAddProjectCommand } from '../../lib/cli/project.js'

const { dataPath } = getConfig('test')
const projectsFile = join(dataPath, 'projects.json')

// Helper function to reset the test data
function resetTestData () {
  fs.writeFileSync(projectsFile, '[]')
}

// Mock inquirer for testing
jest.spyOn(inquirer, 'prompt').mockImplementation(async (questions) => {
  const questionMap = {
    'What is the name of the project?': 'eslint',
    'Enter the GitHub URLs (comma-separated):': 'https://github.com/eslint',
    'Select a category:': 'impact'
  }
  return questions.reduce((acc, question) => {
    acc[question.name] = questionMap[question.message]
    return acc
  }, {})
})

beforeEach(resetTestData)
afterEach(jest.clearAllMocks)
afterAll(resetTestData)

describe('Interactive Mode', () => {
  test('Add a project with name, GitHub URLs, and category', async () => {
    await runAddProjectCommand({})
    const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf-8'))
    expect(projects.length).toBe(1)
    expect(projects[0].name).toBe('eslint')
    expect(projects[0].githubOrgs[0].url).toBe('https://github.com/eslint')
    expect(projects[0].category).toBe('impact')
  })

  test('Prevent to add a project that already exists', async () => {
    await runAddProjectCommand({})
    await expect(runAddProjectCommand({}))
      .rejects
      .toThrow('Project with name eslint already exists')
  })
})

describe('Non-Interactive Mode', () => {
  test('Add a project with name, GitHub URLs, and category', async () => {
    await runAddProjectCommand({ name: 'eslint', githubUrls: ['https://github.com/eslint'], category: 'impact' })
    const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf-8'))
    expect(projects.length).toBe(1)
    expect(projects[0].name).toBe('eslint')
    expect(projects[0].githubOrgs[0].url).toBe('https://github.com/eslint')
    expect(projects[0].category).toBe('impact')
  })

  test('Prevent to add a project that already exists', async () => {
    await runAddProjectCommand({ name: 'eslint', githubUrls: ['https://github.com/eslint'], category: 'impact' })
    await expect(runAddProjectCommand({ name: 'eslint', githubUrls: ['https://github.com/eslint'], category: 'impact' }))
      .rejects
      .toThrow('Project with name eslint already exists')
  })

  test('Error when no name is provided', async () => {
    await expect(runAddProjectCommand({ githubUrls: ['https://github.com/eslint'], category: 'impact' }))
      .rejects
      .toThrow('Project name is required')
  })

  test('Error when no GitHub URLs are provided', async () => {
    await expect(runAddProjectCommand({ name: 'eslint', category: 'impact' }))
      .rejects
      .toThrow('GitHub URLs are required')
  })

  test('Error when no category is provided', async () => {
    await expect(runAddProjectCommand({ name: 'eslint', githubUrls: ['https://github.com/eslint'] }))
      .rejects
      .toThrow('Category is required')
  })

  test('Error when invalid GitHub URLs are provided', async () => {
    await expect(runAddProjectCommand({ name: 'eslint', githubUrls: ['invalid-url'], category: 'impact' }))
      .rejects
      .toThrow('Invalid URL: invalid-url. Please enter valid GitHub URLs.')
  })
})
