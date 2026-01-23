import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json({ limit: '1024kb' }));
app.use(helmet());
app.use(cors());

// Routes

app.use(notesRoutes);

// app.get('/test-error', () => {
//   throw new Error('Simulated server error');
// });

// 404 handler - Route not found
app.use(notFoundHandler);
// 500 handler - Internal Server Error
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
