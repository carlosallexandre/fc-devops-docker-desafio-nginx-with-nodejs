import 'dotenv/config';
import express from 'express';

import dbConnection from './database.js';

const app = express();

app.get('/', async (_, res) => {
  await new Promise((res, rej) => {
    dbConnection.query(
      "INSERT INTO people (name) VALUES ('John Doe')",
      function (error) {
        if (error) rej(error);
        res(null);
      }
    )
  });

  const result = await new Promise((res, rej) => {
    dbConnection.query(
      `SELECT name FROM people`,
      function (error, results, fields) {
        if (error) rej(error);
        res(results);
      }
    );
  });

  res.send(`
    <h1>Full Cycle Rocks</h1>
    <ul>
      ${result.map(({ name }) => `<li>${name}</li>`).join('')}
    </ul>
  `);
});


async function bootstrap() {
  app.listen(
    process.env.PORT, 
    () => console.log('listening on port ' + process.env.PORT)
  );
}

bootstrap();

process.on('SIGINT', () => {
  console.log('Closing db connection');
  dbConnection.destroy();
});
process.on('SIGTERM', () => {
  console.log('Closing db connection');
  dbConnection.destroy();
});