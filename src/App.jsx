import { useState, useEffect } from 'react';
import './App.css';
import Note from './Note';

function App() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [color, setColor] = useState("#ffffff");
 
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterColor, setFilterColor] = useState("");

 const [listobj, setListobj] = useState(() => {
  // Initialize state from localStorage if available
  try {
    const storedNotes = window.localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  } catch (error) {
    console.error("Error parsing notes from localStorage during initialization", error);
    return [];
  }
});
  useEffect(() => {
    try {
      const storedNotes = window.localStorage.getItem("notes");
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setListobj(parsedNotes);
        setCount(parsedNotes.length);
        console.log("Get Item" + listobj);
      }
    } catch (error) {
      console.error("Error loading notes from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("notes", JSON.stringify(listobj));
      console.log("Set Item" + listobj);
    } catch (error) {
      console.error("Error saving notes to localStorage", error);
    }
  }, [listobj]);

  function handleAddNote() {
    if (title.trim() === "" || note.trim() === "") {
      alert("Please enter both a title and a note.");
      return;
    }

    const newNote = { title, description: note, color };

    let updatedList;
    if (editingIndex !== null) {
      updatedList = listobj.map((item, index) =>
        index === editingIndex ? newNote : item
      );
      setEditingIndex(null);
      console.log("Updated Item" + listobj);
    } else {
      updatedList = [...listobj, newNote];
    }

    setListobj(updatedList);
    setCount(updatedList.length);

    setTitle("");
    setNote("");
    setColor("#ffffff");

    console.log("New note added/edited:", newNote);
    console.log("Updated list of notes:", updatedList);
  }

  function handleDeleteNote(index) {
    const updatedList = listobj.filter((_, i) => i !== index);
    setListobj(updatedList);
    setCount(updatedList.length);

    console.log("Note deleted:", index);
    console.log("Updated list of notes:", updatedList);
  }

  function handleEditNote(index) {
    const noteToEdit = listobj[index];
    setTitle(noteToEdit.title);
    setNote(noteToEdit.description);
    setColor(noteToEdit.color);
    setEditingIndex(index);

    console.log("Editing note:", index);
  }

  const filteredNotes = filterColor
    ? listobj.filter((note) => note.color === filterColor)
    : listobj;
    const colorOptions = [
      "#cfbaf0", "#90dbf4", "#8eecf5", "#b9fbc0", "#fdffb6", "#ffcfd2", "#FFCFE4"
    ];
  return (
    <>
      <h1>React-based Notes Application</h1>
      <h4>You have currently, {count} notes</h4>
      <div id='container'>
        <div className='ip'>
          <label htmlFor="title"><h3>Title:</h3></label>
          <input
            type='text'
            id="title"
            placeholder='Add Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='ip'>
          <label htmlFor="note"><h3>Note:</h3></label>
          <input
            type='textarea'
            id="note"
            placeholder='Add Description'
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className='ip'>
  <div className="color-options">
    {colorOptions.map((colorOption) => (
      <label key={colorOption} style={{ backgroundColor: colorOption }} className="color-circle"
      id={color === colorOption ? "selected" : ""}>
        <input
          type="radio"
          name="color"
          value={colorOption}
          checked={color === colorOption}
          onChange={() => setColor(colorOption)}
        />
        <span  style={{ backgroundColor: colorOption }}></span>
      </label>
    ))}
  </div>
</div>


        <button className='button' onClick={handleAddNote}>
          {editingIndex !== null ? "Update Note" : "Create New"}
        </button>
      </div>

      <div className='filter'>
  <h3>Filter by color:</h3>
  <div className="color-options">
    <label>
      <input
        type="radio"
        name="filterColor"
        value=""
        checked={filterColor === ""}
        onChange={() => setFilterColor("")}
      />
      <span className="color-circle"  style={{ backgroundColor: '#ffffff' }} id={filterColor === "" ? "selectall" : "all"}>All</span>
    </label>
    {colorOptions.map((colorOption) => (
      <label key={colorOption} style={{ backgroundColor: colorOption }} className="color-circle" id={filterColor === colorOption ? "selected" : ""}>
        <input
          type="radio"
          name="filterColor"
          value={colorOption}
          checked={filterColor === colorOption}
          onChange={() => setFilterColor(colorOption)}
        />
        <span  style={{ backgroundColor: colorOption }}></span>
      </label>
    ))}
  </div>
</div>



      <div className='cardcontainer'>
        {filteredNotes.map((item, index) => (
          <Note
            key={index}
            title={item.title}
            description={item.description}
            color={item.color}
            onDelete={() => handleDeleteNote(index)}
            onEdit={() => handleEditNote(index)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
