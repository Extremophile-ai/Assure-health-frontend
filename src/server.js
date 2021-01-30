import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

// routes
app.use('/', router);

// Home page

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
