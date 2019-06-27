import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer: string) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
