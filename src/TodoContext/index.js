import React from 'react';
import { db } from './firebaseConfig';
import { getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';


const TodoContext = React.createContext();

function TodoProvider(props) {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchTodos = async () => {
      try {
        const docRef = doc(db, 'todos', 'todoList');
        const docSnapshot = await getDoc(docRef);
    
        if (docSnapshot.exists()) {
          const todosData = docSnapshot.data().todos;
          setTodos(todosData);
        } else {
          await setDoc(doc(db, 'todos', 'todoList'), { todos: [] });
          setTodos([]);
        }
    
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    
  
    fetchTodos();
  }, []);
  
  const saveTodos = async (newTodos) => {
    try {
      setTodos(newTodos);
      await setDoc(doc(db, 'todos', 'todoList'), { todos: newTodos });
    } catch (error) {
      setError(error);
    }
  };

  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = async (text) => {
    try {
      const newTodos = todos.filter(todo => todo.text !== text);
      await deleteDoc(doc(db, 'todos', 'todoList'));
      await setDoc(doc(db, 'todos', 'todoList'), { todos: newTodos });
      setTodos(newTodos);
    } catch (error) {
      setError(error);
    }
  };

  const addTodo = async (text) => {
    try {
      const newTodo = {
        id: Date.now().toString(),
        completed: false,
        text,
      };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      await setDoc(doc(db, 'todos', 'todoList'), { todos: newTodos });
    } catch (error) {
      setError(error);
    }
  };
  
  const editTodo = async (id, newText) => {
    try {
      const todoIndex = todos.findIndex(todo => todo.text === id);
      const updatedTodo = { ...todos[todoIndex], text: newText };
      await setDoc(doc(db, 'todos', 'todoList'), { todos: todos.map(todo => (todo.text === id ? updatedTodo : todo)) });
      setTodos(todos.map(todo => (todo.text === id ? updatedTodo : todo)));
    } catch (error) {
      setError(error);
    }
  };
  ;
  

  const reorderTodos = (sourceIndex, destinationIndex) => {
    const updatedTodos = Array.from(todos);
    const [reorderedTodo] = updatedTodos.splice(sourceIndex, 1);
    updatedTodos.splice(destinationIndex, 0, reorderedTodo);
    saveTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        addTodo,
        deleteTodo,
        editTodo,
        reorderTodos,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };