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
} from '../validations/notesValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/notes', getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdParamSchema), getNoteById);
// router.get('/test-error', causeTestError);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.delete('/notes/:noteId', celebrate(noteIdParamSchema), deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
