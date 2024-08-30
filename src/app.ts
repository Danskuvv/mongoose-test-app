import dotenv from 'dotenv';
dotenv.config();
import express, {Request, Response} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import {notFound, errorHandler} from './middlewares';
import api from './api';
import {MessageResponse} from './types/Messages';

import categoryRoutes from './routes/category_routes';
import speciesRoutes from './routes/species_routes';
import animalRoutes from './routes/animals_routes';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API location: api/v1',
  });
});

app.use('/api/v1', api);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/species', speciesRoutes);
app.use('/api/v1/animals', animalRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
