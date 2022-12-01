import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  //for storing todos locally
  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);
  
  //form submit
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  //Delete todo functionality
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  //Editing submit funtionality
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div className="App min-h-screen">
      <h1 className="text-6xl font-bold">TODO LIST</h1>
      <form className="container " onSubmit={handleSubmit}>
        <div className="mt-10 flex justify-center items-center w-full">
          <input
            type="text"
            className="w-1/2 h-20 px-4 text-2xl rounded-sm"
            placeholder=" Todos..."
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            required
          />
          <button className="  bg-[#5645f7] h-20 px-4 text-2xl  rounded-md text-white font-bold hover:bg-[#796de2] hover:scale-95 hover:ease-in-out hover:duration-300" type="submit">
            Add TODO
          </button>
        </div>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className=" flex justify-between items-center w-9/12 mt-4 p-4 bg-[#5645f7] text-4xl text-white rounded-xl">
          {todoEditing === todo.id ? (
            <input
              type="text"
              className="w-2/6 h-14 p-4 text-4xl text-gray-500 rounded-sm"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <h2>{todo.text}</h2>
          )}

          <div className="flex justify-between items-center">
            <button
              className="bg-red-500 text-white text-2xl px-4 py-2 font-bold rounded-lg hover:scale-95 hover:ease-in-out hover:duration-300"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>

            {todoEditing === todo.id  ? ( <button
              className="bg-green-500 text-white text-2xl px-4 py-2 ml-4 font-bold rounded-lg hover:scale-95 hover:ease-in-out hover:duration-300"
              onClick={() => submitEdits(todo.id)}
            >
              Submit Edit
            </button>)  : (<button
              className="bg-green-500 text-white text-2xl px-4 py-2 ml-4 font-bold rounded-lg hover:scale-95 hover:ease-in-out hover:duration-300"
              onClick={() => setTodoEditing(todo.id)}
            >
              Edit
            </button>
            ) }
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
