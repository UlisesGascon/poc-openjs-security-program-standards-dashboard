import { join } from 'path'

const relevantRepoProperties = ['id', 'node_id', 'name', 'full_name', 'private', 'html_url', 'description', 'fork', 'created_at', 'updated_at', 'pushed_at', 'size', 'stargazers_count', 'watchers_count', 'language', 'has_issues', 'has_projects', 'has_downloads', 'has_wiki', 'has_pages', 'has_discussions', 'forks_count', 'mirror_url', 'archived', 'disabled', 'open_issues_count', 'license', 'allow_forking', 'is_template', 'web_commit_signoff_required', 'topics', 'visibility', 'forks', 'open_issues', 'watchers', 'default_branch', 'permissions']

const defaultValues = {
  dataPath: join(process.cwd(), 'data'),
  relevantRepoProperties
}

const testEnvironment = {
  dataPath: join(process.cwd(), '__tests__', 'data'),
  relevantRepoProperties
}

export function getConfig (env) {
  // env variable should override the NODE_ENV
  const environment = env || process.env.NODE_ENV
  const config = environment === 'test' ? testEnvironment : defaultValues
  return config
}
