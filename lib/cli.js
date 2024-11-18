import inquirer from 'inquirer'

export async function runOrderCommand (item, options = {}) {
  if (item === 'pizza') {
    const answers = options.size && options.cheese
      ? options
      : await inquirer.prompt([
        {
          type: 'list',
          name: 'size',
          message: 'What size of pizza do you want?',
          choices: ['Small', 'Medium', 'Large'],
          when: () => !options.size
        },
        {
          type: 'number',
          name: 'cheese',
          message: 'How many cheese layers do you like?',
          validate: (input) =>
            input > 0 ? true : 'Please enter a positive number of cheese layers.',
          when: () => !options.cheese
        }
      ])
    console.log(`You ordered a ${answers.size} pizza with ${answers.cheese} cheese layers.`)
    return answers
  } else {
    console.log(`Sorry, we don't have ${item} available.`)
    return { item: null }
  }
}
