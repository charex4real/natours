const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
//must be before the  app = require('./app') file
dotenv.config({ path: './config.env' });

const app = require('./app');

//console.log(app.get('env'));
//console.log(process.env);
const port = process.env.PORT || 3000;
// 4) START SERVER

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log('Db connection successful');
});
//.catch((err) => console.log(err));

const server = app.listen(port, () => {
  console.log(`App running on ${port} ...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
//const//
