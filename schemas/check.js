import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { readFileSync } from 'fs'
import { join } from 'path'

const checksSchema = JSON.parse(readFileSync(join(process.cwd(), 'schemas/types/checks.json'), 'utf-8'))

const ajv = new Ajv()
addFormats(ajv)
const validate = ajv.compile(checksSchema)

export function validateAllChecks (checks) {
  const valid = validate(checks)
  if (!valid) {
    throw new Error(validate.errors.map((error) => error.message).join('\n'))
  }
}
