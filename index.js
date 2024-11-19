#!/usr/bin/env node

import { Command } from 'commander'
import { runAddProjectCommand } from './lib/cli/project.js'
import { runWorkflowCommand, ListWorkflowCommand } from './lib/cli/workflow.js'

const program = new Command()

const project = program.command('project').description('Manage projects')

// Project commands
project
  .command('add')
  .description('Add a new project')
  .option('--name <name>', 'Name of the project')
  .option('--github-urls <urls...>', 'GitHub URLs of the project')
  .action((options) => {
    runAddProjectCommand(options)
  })

// Workflow commands
const workflow = program.command('workflow').description('Manage workflows')

workflow
  .command('run')
  .description('Run a workflow')
  .option('--name <name>', 'Name of the workflow')
  .action((options) => {
    runWorkflowCommand(options)
  })

workflow
  .command('list')
  .description('List all available workflows')
  .action((options) => {
    ListWorkflowCommand(options)
  })

program.parse(process.argv)
