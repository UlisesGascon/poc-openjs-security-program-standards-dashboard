#!/usr/bin/env node

import { Command } from 'commander'
import { runAddProjectCommand } from './lib/cli/project.js'

const program = new Command()

program
  .command('project add')
  .description('Add a new project')
  .option('--name <name>', 'Name of the project')
  .option('--github-urls <urls...>', 'GitHub URLs of the project')
  .action((options) => {
    runAddProjectCommand(options)
  })

program.parse(process.argv)