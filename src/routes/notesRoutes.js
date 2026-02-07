import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import {
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
  getAllNotesSchema,
} from '../validations/notesValidation.js';
import { celebrate } from 'celebrate';
// import { Segments } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// router.get('/test-error', causeTestError);

router.use('/notes', authenticate);

router.get('/notes', celebrate({ query: getAllNotesSchema }), getAllNotes);
router.get('/notes/:noteId', celebrate({ params: noteIdSchema }), getNoteById);
router.post('/notes', celebrate({ body: createNoteSchema }), createNote);
router.delete(
  '/notes/:noteId',
  celebrate({ params: noteIdSchema }),
  deleteNote,
);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
