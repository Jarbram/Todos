import React from 'react';
import './TodosLoading.css';

function TodosLoading(){
    return(
    <div className="LoadingTodo-container">
        <span className="LoadingTodo-completeIcon"></span>
        <p className="LoadingTodo-text">Don't worry, it's loading</p>
        <span className="LoadingTodo-deleteIcon"></span>
    </div>
    );
}

export {TodosLoading};