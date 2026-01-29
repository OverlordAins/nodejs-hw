import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// Controller functions for managing notes

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, title, content } = req.params;
  const skip = (page - 1) * perPage;

  // const notes = await Note.find().skip(skip).limit(perPage);

  const notesQuery = Note.find();
  // { tag: { $eq: tag }, title: { $eq: title }, content: { $eq: content }, }

  if (tag) {
    notesQuery.where('tag').equals(tag);
  }
  if (title) {
    notesQuery.where('title').equals(title);
  }
  if (content) {
    notesQuery.where('content').equals(content);
  }

  const { totalItems, notes } = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.find().skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  res
    .status(200)
    .json({ page, perPage, totalItems, totalPages, notes: [notes] });
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json({ note });
};

// export const causeTestError = async () => {
//   throw new Error('Simulated server error');
// };

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json({ note });
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete({ _id: noteId });
  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json({ note });
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndUpdate({ _id: noteId }, req.body, {
    new: true,
  });
  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json({ note });
};
