# POC - OpenJS Security Program Standards Dashboard



## 📺 Tutorial

If you don't have a good context of this POC motivation, please watch the following video or the slides:

[![Screenshot from 2024-11-21 15-26-46](https://github.com/user-attachments/assets/e34187bb-c69a-4c2f-b061-ccbf0f7291db)
](https://youtu.be/B1kd8k5SvBI)

- [slides](https://slides.ulisesgascon.com/openjs-security-program-standards/)


## Installation

To install the dependencies, run:

```sh
npm install
```

## Configuration

### Environment Variables

This project requires a GitHub token to access the GitHub API. You need to set the `GITHUB_TOKEN` environment variable. 

#### Optional: use .env file

Create a `.env` file and add your GitHub token:

```sh
GITHUB_TOKEN=your_github_token_here
```

then use `--env-file` flag to load it, like `node --env-file=.env index.js workflow run --name populate-repos-list`

## Usage

### Workflows

To run a workflow, use the following command:

```bash
node index.js workflow run [--name <name>]
```

To list all available workflows, use the following command:

```bash
node index.js workflow list
```


### Projects

To add a new project, use the following command:

```bash
node index.js project add [--name <name>] [--github-urls <urls...>]
```

For example, to add a project named "express" with GitHub URLs:

```bash
node index.js project add --name express --github-urls https://github.com/expressjs https://github.com/pillarjs https://github.com/jshttp
```

## Running Tests

To run the tests, use:

```bash
npm test
```

## Linting

To lint the code, use:

```bash
npm run lint
```

To automatically fix linting errors, use:

```bash
npm run lint:fix
```

## Continuous Integration

This project uses GitHub Actions for continuous integration. The configuration is in the .github/workflows/ci.yml file. The CI pipeline runs on every push and pull request, and it includes the following steps:


- Install dependencies
- Lint code
- Run tests

## License

This project is licensed under the MIT License. See the LICENSE file for details.

