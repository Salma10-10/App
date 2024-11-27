"use client"; // Tell Next.js this is a client-side component

import { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the todos on component mount
    const fetchTodos = async () => {
      try {
        const res = await fetch("/api/todos");
        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return; // Avoid adding empty todos

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodo }),
      });
      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      const newItem = await res.json();
      setTodos((prev) => [...prev, newItem]);
      setNewTodo(""); // Clear the input field
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoList;
