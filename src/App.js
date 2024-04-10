import React, { useState, useReducer } from 'react';
import './App.css';

const initBooks = [{ 
  id: 1,
  title: "Harry Potter",
  author: "Rom Whis"
}]

const ADD = "ADD_BOOK";
const REMOVE = "REMOVE_BOOK";
const EDIT = "EDIT_BOOK";
const CLEAR_ALL = "CLEAR_ALL";

const reducer = (state, action) => {
  if(action.type === ADD){
    return {
      ...state,
      books: [...state.books, action.book],
    }
  }
  if(action.type === REMOVE){
    return {
      ...state,
      books: state.books.filter(item => item.id !== action.id),
    }
  }
  if(action.type === EDIT){
    return {
      ...state,
      books: state.books.map(item => {
        if(item.id === action.book.id){
          return action.book;
        }
        return item;
      })
    }
  }
  if(action.type === CLEAR_ALL){
    return {
      ...state,
      books: [],
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {'books': initBooks});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editingId, setEditingId] = useState(null);

  const getRandomId = () => {
    return Math.floor(Math.random() * 10000);
  }

  const clearInputs = () => {
    setTitle("");
    setAuthor("");
  }

  const handleCreate = () => {
    if(!author || !title){
      return;
    }
    const book = {
      id: getRandomId(),
      title,
      author,
    };
    dispatch({ type: ADD, book });
    clearInputs();
  };

  const handleEdit = (id) => {
    const currentBook = state.books.find(item => item.id === id);
    setAuthor(currentBook.author);
    setTitle(currentBook.title);
    setEditingId(id);
  }

  const handleUpdate = () => {    
    const currentBook = state.books.find(item => item.id === editingId);
    dispatch({ type: EDIT, book: {
      ...currentBook,
      title,
      author,
    }});
    clearInputs();
  };

  const handleDelete = (id) => {
    if(editingId === id){
      setEditingId(null);
      clearInputs();
    }
    dispatch({"type": REMOVE, id });
  }

  const handleClearAll = () => {
    dispatch({"type": CLEAR_ALL})
  };


  return (
    <div className="App">
      <h1>useReducer Basic Example</h1>
      <div>
        <input 
          type="text" 
          placeholder="Author" 
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Title" 
          value={title}
          onChange={e => setTitle(e.target.value)}
         />
        {
          editingId 
            ? <button onClick={handleUpdate}>Update</button>
            : <button onClick={handleCreate}>Create</button>
        }
      </div>
      <br />
      <button onClick={handleClearAll}>Clear all</button>
      <br />
      <br />
      {state.books.map(item => {
        return (
          <div>
            {item.title} - {item.author}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        )})}
    </div>
  );
}

export default App;
