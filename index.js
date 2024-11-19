#!/usr/bin/env node

import { Command } from 'commander'
import { runAddProjectCommand } from './lib/cli/project.js'

const program = new Command()

const project = program.command('project').description('Manage projects')

project
  .command('add')
  .description('Add a new project')
  .option('--name <name>', 'Name of the project')
  .option('--github-urls <urls...>', 'GitHub URLs of the project')
  .action((options) => {
    runAddProjectCommand(options)
  })

program.parse(process.argv)
