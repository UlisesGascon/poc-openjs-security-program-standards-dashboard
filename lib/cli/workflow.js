import { populateRepositories } from '../workflows/populate-repos-list.js'
import { checkHealth } from '../workflows/check-health.js'
import { generateReports } from '../workflows/generate-reports.js'
import inquirer from 'inquirer'

const commandList = [{
  name: 'populate-repos-list',
  description: 'Populate the list of repositories for each GitHub organization included in all the projects.'
},
{
  name: 'check-health',
  description: 'Check the health of all the repositories in the projects.'
}, {
  name: 'generate-reports',
  description: 'Generate reports with all the relevant data available.'
}]
const validCommandNames = commandList.map(({ name }) => name)

export async function ListWorkflowCommand (options = {}) {
  console.log('Available workflows:')
  console.log(commandList.map(({ name, description }) => `- ${name}: ${description}`).join('\n'))
  return {}
}

export async function runWorkflowCommand (options = {}) {
  if (Object.keys(options).length && !validCommandNames.includes(options.name)) {
    throw new Error('Invalid workflow name. Please enter a valid workflow name.')
  }

  const answers = options.name
    ? options
    : await inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'What is the name of the workflow?',
        choices: validCommandNames,
        when: () => !options.name
      }
    ])

  if (answers.name === 'populate-repos-list') {
    await populateRepositories()
  }

  if (answers.name === 'check-health') {
    await checkHealth()
  }

  if (answers.name === 'generate-reports') {
    await generateReports()
  }

  return answers
}
