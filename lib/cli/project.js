import inquirer from 'inquirer'
import { stringToArray } from "@ulisesgascon/string-to-array";
import isURL from 'validator/lib/isURL.js'
import isSlug from 'validator/lib/isSlug.js'
import { addProject } from '../store/index.js';

export async function runAddProjectCommand(options = {}) {
  const answers = options.name && options.githubUrls
    ? options
    : await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project?',
        transformer: (input) => input.toLowerCase(),
        validate: (input) => {
          if (!isSlug(input)) {
            return 'Invalid project name. Please enter a valid slug.'
          }
          return true
        },
        when: () => !options.name
      },
      {
        type: 'input',
        name: 'githubUrls',
        message: 'Enter the GitHub URLs (comma-separated):',
        filter: (input) => stringToArray(input),
        transformer: (input) => input.toLowerCase(),
        validate: (input) => {
          const urls = stringToArray(input)
          if (urls.length === 0) {
            return 'At least one GitHub URL is required.'
          }
          for (const url of urls) {
            if (!isURL(url, { protocols: ['https'], require_protocol: true }) || !url.includes('github.com')) {
              return `Invalid URL: ${url}. Please enter valid GitHub URLs.`
            }
          }
          return true
        },
        when: () => !options.githubUrls
      }
    ])

  answers.githubUrls = Array.isArray(answers.githubUrls) ? answers.githubUrls : stringToArray(answers.githubUrls)

  addProject({
    name: answers.name.toLowerCase(),
    githubOrgs: answers.githubUrls.map((url) => ({
      url,
      name: url.split('https://github.com/')[1]
    }))
  })

  return answers
}