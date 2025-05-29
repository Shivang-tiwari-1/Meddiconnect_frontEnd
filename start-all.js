import concurrently from 'concurrently';

concurrently([
  { command: 'vite', name: 'VITE', prefixColor: 'cyan' },
  { command: 'nodemon "../../../backend/index.js"', name: 'BACKEND', prefixColor: 'yellow' }
]);
