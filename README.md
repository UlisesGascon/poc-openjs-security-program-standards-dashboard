# POC - OpenJS Security Program Standards Dashboard

## Installation

To install the dependencies, run:

```sh
npm install
```


## Usage

To order an item, use the following command:

```bash
node  order <item> [--size <size>] [--cheese <cheese>]
```

For example, to order a medium pizza with 2 cheese layers:

```bash
node  order pizza --size Medium --cheese 2
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

