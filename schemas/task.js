import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { readFileSync } from 'fs'
import { join } from 'path'

const tasksSchema = JSON.parse(readFileSync(join(process.cwd(), 'schemas/types/tasks.json'), 'utf-8'))

const ajv = new Ajv()
addFormats(ajv)
const validate = ajv.compile(tasksSchema)

export function validateAllTasks (tasks) {
  const valid = validate(tasks)
  if (!valid) {
    throw new Error(validate.errors.map((error) => error.message).join('\n'))
  }
}
