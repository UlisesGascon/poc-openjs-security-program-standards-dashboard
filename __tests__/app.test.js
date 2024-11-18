import { test } from 'node:test'
import assert from 'node:assert'
import { runOrderCommand } from '../lib/cli.js'
import sinon from 'sinon'
import inquirer from 'inquirer'

// Mock inquirer for testing
sinon.stub(inquirer, 'prompt').callsFake(async (questions) => {
  const questionMap = {
    'What size of pizza do you want?': 'Medium',
    'How many cheese layers do you like?': 2
  }
  return questions.reduce((acc, question) => {
    acc[question.name] = questionMap[question.message]
    return acc
  }, {})
})

test('Order a pizza with options and get correct responses', async () => {
  const result = await runOrderCommand('pizza', { size: 'Medium', cheese: 2 })
  assert.deepStrictEqual(result, { size: 'Medium', cheese: 2 }, 'Expected correct pizza order with options')
})

test('Order a pizza without options and get correct responses', async () => {
  const result = await runOrderCommand('pizza')
  assert.deepStrictEqual(result, { size: 'Medium', cheese: 2 }, 'Expected correct pizza order without options')
})

test('Handle unavailable item', async () => {
  const result = await runOrderCommand('burger')
  assert.deepStrictEqual(result, { item: null }, 'Expected null for unavailable item')
})
