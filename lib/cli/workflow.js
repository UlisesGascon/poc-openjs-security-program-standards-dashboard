import { populateRepositories } from '../workflows/populate-repos-list.js'
import inquirer from 'inquirer'

const commandList = [{
  name: 'populate-repos-list',
  description: 'Populate the list of repositories for each GitHub organization included in all the projects.'
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

  return answers
}
