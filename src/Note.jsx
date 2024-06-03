import React from 'react';
import './Note.css';

const Note = ({ title, description, color, onDelete, onEdit }) => {
  return (
    <div className='note' style={{ backgroundColor: color }}>
      <h3 className='heading'>{title}</h3>
      <p>{description}</p>
      <div>
      <button className='edit' onClick={onEdit}><i className="fa-solid fa-pen-to-square"></i></button>
      <button className='delete' onClick={onDelete}><i className="fa-solid fa-trash"></i></button>
      </div>
    </div>
  );
};

export default Note;
