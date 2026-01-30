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
  noteIdParamSchema,
  getAllNotesSchema,
} from '../validations/notesValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

// router.get('/test-error', causeTestError);
router.get('/notes', celebrate({ query: getAllNotesSchema }), getAllNotes);
router.get(
  '/notes/:noteId',
  celebrate({ params: noteIdParamSchema }),
  getNoteById,
);
router.post('/notes', celebrate({ body: createNoteSchema }), createNote);
router.delete(
  '/notes/:noteId',
  celebrate({ params: noteIdParamSchema }),
  deleteNote,
);
router.patch(
  '/notes/:noteId',
  celebrate({ body: updateNoteSchema, params: noteIdParamSchema }),
  updateNote,
);

export default router;
