const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./model/tourModel');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8'),
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Db connection successful');
  })
  .catch((err) => console.log(err));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully created');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);

//const//
