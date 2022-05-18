import React from 'react';
import{ TodoContext} from '../TodoContext'
import './TodoForm.css'

function TodoForm(){
    const [newTodoValue, setNewTodoValue] =React.useState('');

    const { 
        addTodo,
        setOpenModal,
    } = React.useContext(TodoContext);

    const onChange = (event) => {
        setNewTodoValue(event.target.value);
        };

    const onCancel = () => {
    setOpenModal(false);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if(newTodoValue.length <= 0)return setOpenModal(false);
        addTodo(newTodoValue);
        setOpenModal(false);
        };
    return(
        <form onSubmit={onSubmit}>
            <label>Write your new task</label>
            <textarea
            value={newTodoValue}
            onChange={onChange}
            placeholder="Enter your task..."/>

            <div className="TodoForm-buttonContainer">
                <button 
                type="button"
                className="TodoForm-button TodoForm-button-cancel"
                onClick={onCancel}>
                    Cancel
                </button>

                <button type="submit" 
                className="TodoForm-button TodoForm-button-add"
                onclick={onSubmit}>
                    Save
                </button>
            </div>

        </form>
    );
}

export {TodoForm};