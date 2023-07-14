import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { TodosError } from '../TodosError';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';

function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    reorderTodos,
  } = React.useContext(TodoContext);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    reorderTodos(sourceIndex, destinationIndex);
  };

  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />

      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoList>
          {error && <TodosError error={error} />}
          {loading && <TodosLoading />}
          {!loading && !searchedTodos.length && <EmptyTodos />}

          <Droppable droppableId="todo-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {searchedTodos.map((todo, index) => (
                  <Draggable
                    key={todo.text}
                    draggableId={todo.text}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem
                          key={todo.text}
                          text={todo.text}
                          completed={todo.completed}
                          onComplete={() => completeTodo(todo.text)}
                          onDelete={() => deleteTodo(todo.text)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </TodoList>
      </DragDropContext>

      {!!openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} openModal={openModal} />
    </React.Fragment>
  );
}

export { AppUI };
