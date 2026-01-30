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
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdParamSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.delete('/notes/:noteId', celebrate(noteIdParamSchema), deleteNote);
router.patch(
  '/notes/:noteId',
  celebrate(updateNoteSchema, noteIdParamSchema),
  updateNote,
);

export default router;
