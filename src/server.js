import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import helmet from 'helmet';

import { connectMongoDB } from './db/connectMongoDB.js';
import { Note } from './models/note.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({ notes });
});
app.get('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' }); // 404 handler - Note not found
  }
  res.status(200).json({ note });
});
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// 404 handler - Route not found
app.use(notFoundHandler);
// 500 handler - Internal Server Error
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
