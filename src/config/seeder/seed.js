import seeder from 'mongoose-seed';
import dotenv from 'dotenv';
import candidate from './candidate';

dotenv.config();
// DEV_MONGO_URI

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const data = [
  candidate
];
seeder.connect(process.env.DEV_MONGO_URI, options, () => {
// seeder.connect(process.env.TEST_MONGO_URI, options, () => {
// load models
  seeder.loadModels([
    './src/model/candidate',
  ]);

  //   clear database
  seeder.clearModels(['Candidate'], () => {
    seeder.populateModels(data, (err, done) => {
      if (err) {
        console.log(err);
        return err;
      }
      if (done) {
        console.log('seeding done');
      }
      seeder.disconnect();
    });
  });
});
