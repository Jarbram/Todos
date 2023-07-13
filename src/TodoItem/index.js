import React, { useState, useRef, useEffect } from 'react';
import { CompleteIcon } from '../TodoIcon/CompleteIcon';
import { DeleteIcon } from '../TodoIcon/DeleteIcon';
import './TodoItem.css';
import { TodoContext } from '../TodoContext';

function TodoItem(props) {
  const { editTodo } = React.useContext(TodoContext);
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(props.text);
  const textInputRef = useRef(null);

  const handleEditMode = () => {
    if (!props.completed) {
      setEditMode(true);
    }
  };

  const handleSave = () => {
    editTodo(props.text, text);
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (textInputRef.current && !textInputRef.current.contains(event.target)) {
      handleSave();
    }
  };

  useEffect(() => {
    if (editMode) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editMode]);

  return (
    <li className="TodoItem">
      <CompleteIcon completed={props.completed} onComplete={props.onComplete} />
      <p
        className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}
        onClick={handleEditMode}
      >
        {editMode ? (
          <textarea
            className="TodoItem-input"
            type="text"
            value={text}
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSave();
              }
            }}
            ref={textInputRef}
          />
        ) : (
          props.text
        )}
      </p>
      <DeleteIcon onDelete={props.onDelete} />
    </li>
  );
}

export { TodoItem };
