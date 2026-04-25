import express from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
app.use(cookieParser());

app.get('/', (req, res) => {
  logger.info('Hello World route was accessed');
  res.send('Hello World for you!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/api', (req, res) => {
  logger.info('API route was accessed');
  res.send('API route');
});

app.use('/api/auth', authRoutes);

export default app;
