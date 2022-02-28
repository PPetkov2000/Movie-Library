import api from "../utils/api-instance";

const getNotes = async () => {
  const notes = await api.get("/notes");
  return notes;
};

const getNote = async (id) => {
  const note = await api.get(`/notes/${id}`);
  return note;
};

const addNote = async (noteData) => {
  const note = await api.post("/notes", { note: noteData });
  return note;
};

const removeNote = async (id) => {
  const note = await api.delete(`/notes/${id}`);
  return note;
};

export { getNotes, getNote, addNote, removeNote };
