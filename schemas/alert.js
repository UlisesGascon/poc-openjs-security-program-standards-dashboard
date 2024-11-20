import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { readFileSync } from 'fs'
import { join } from 'path'

const alertsSchema = JSON.parse(readFileSync(join(process.cwd(), 'schemas/types/alerts.json'), 'utf-8'))

const ajv = new Ajv()
addFormats(ajv)
const validate = ajv.compile(alertsSchema)

export function validateAllAlerts (alerts) {
  console.log(alerts)
  const valid = validate(alerts)
  if (!valid) {
    throw new Error(validate.errors.map((error) => error.message).join('\n'))
  }
}
