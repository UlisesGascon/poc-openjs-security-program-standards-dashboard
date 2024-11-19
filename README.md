# POC - OpenJS Security Program Standards Dashboard

## Installation

To install the dependencies, run:

```sh
npm install
```


## Usage

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

