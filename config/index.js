import { join } from 'path'

const defaultValues = {
  dataPath: join(process.cwd(), 'data')
}

const testEnvironment = {
  dataPath: join(process.cwd(), '__tests__', 'data')
}

export function getConfig (env) {
  // env variable should override the NODE_ENV
  const environment = env || process.env.NODE_ENV
  const config = environment === 'test' ? testEnvironment : defaultValues
  return config
}
