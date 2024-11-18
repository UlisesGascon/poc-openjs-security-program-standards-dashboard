#!/usr/bin/env node

import { runOrderCommand } from './lib/cli.js'
import { Command } from 'commander'

const program = new Command()

program
  .command('order <item>')
  .description('Order a specific item')
  .option('--size <size>', 'Size of the pizza')
  .option('--cheese <cheese>', 'Number of cheese layers', parseInt)
  .action((item, options) => {
    runOrderCommand(item, options)
  })

program.parse(process.argv)
