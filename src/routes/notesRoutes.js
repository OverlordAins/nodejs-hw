import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  causeTestError,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
router.get('/test-error', causeTestError);
router.post('/notes', createNote);
router.delete('/notes/:noteId', deleteNote);
router.patch('/notes/:noteId', updateNote);

export default router;
