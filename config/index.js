import { join } from 'path'

const relevantRepoProperties = ['id', 'node_id', 'name', 'full_name', 'private', 'html_url', 'description', 'fork', 'created_at', 'updated_at', 'pushed_at', 'size', 'stargazers_count', 'watchers_count', 'language', 'has_issues', 'has_projects', 'has_downloads', 'has_wiki', 'has_pages', 'has_discussions', 'forks_count', 'mirror_url', 'archived', 'disabled', 'open_issues_count', 'license', 'allow_forking', 'is_template', 'web_commit_signoff_required', 'topics', 'visibility', 'forks', 'open_issues', 'watchers', 'default_branch', 'permissions']
const projectCategories = ['impact', 'at-large', 'incubation', 'emeritus']
const checksCategories = [
  'user authentication',
  'user account permissions',
  'service authentication',
  'github workflow permissions',
  'vulnerability management',
  'coordinated vulnerability disclosure',
  'code quality',
  'code review',
  'source control',
  'dependency inventory'
]

const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000
const generalExpirationPolicy = NINETY_DAYS

const defaultValues = {
  dataPath: join(process.cwd(), 'data'),
  relevantRepoProperties,
  projectCategories,
  checksCategories,
  generalExpirationPolicy
}

const testEnvironment = {
  dataPath: join(process.cwd(), '__tests__', 'data'),
  relevantRepoProperties,
  projectCategories,
  checksCategories,
  generalExpirationPolicy
}

export function getConfig (env) {
  // env variable should override the NODE_ENV
  const environment = env || process.env.NODE_ENV
  const config = environment === 'test' ? testEnvironment : defaultValues
  return config
}
