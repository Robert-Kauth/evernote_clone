import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadNotebooks } from "../../store/notebooks";
import { addNote } from "../../store/notes";
import styles from "./CreateNote.module.css";

const CreateNote = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [notebookId, setNotebookId] = useState(1);
  const [title, setTitle] = useState("");

  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const userId = useSelector((state) => state.session.user.id);
  const notebook = notebooks.find((notebook) => notebook.id === +notebookId);

  useEffect(() => {
    dispatch(loadNotebooks());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      userId,
      notebookId,
      title,
      content,
    };
    dispatch(addNote(note, notebook));
    setShowModal(false);
  };

  if (!notebooks.length) return null;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.field}>
        <legend className={styles.field}>Create a new note</legend>
        <div className={styles.newTitleContainer}>
          <label htmlFor="title" className={styles.newTitle}>
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.textAreaContainer}>
          <textarea
            name="note"
            cols="30"
            rows="9"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Create your new note here"
            onFocus={(e) => (e.target.placeholder = "")}></textarea>
        </div>
        <div className={styles.selectContainer}>
          <label htmlFor="notebooks" className={styles.selectLabel}>
            Notebook to Save to:
          </label>
          <select
            name="notebooks"
            value={notebookId}
            onChange={(e) => setNotebookId(e.target.value)}>
            {notebooks.map((notebook) => (
              <option key={notebook.id} value={notebook.id}>
                {notebook.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.submit}>
          <button type="submit">Save To Notebook</button>
        </div>
      </fieldset>
    </form>
  );
};
export default CreateNote;
