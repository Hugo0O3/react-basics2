import { useState } from 'react';

const initialTodos = [
  { title: '1', id: 0 },
  { title: '2', id: 1 },
  { title: '3', id: 2 },
];

export default function Todolist() {
  const [todos, setTodos] = useState(initialTodos);
  const [selectedTodo, setSelectedTodo] = useState(
    todos[0]
  );

  function handleTodoChange(id, e) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: e.target.value,
        };
      } else {
        return todo;
      }
    }));
  }

  return (
    <>
      <h1>My Todo App</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              value={todo.title}
              onChange={e => {
                handleTodoChange(todo.id, e)
              }} placeholder='Type a new todo'
            />
            {' '}
            <button onClick={() => {
              setSelectedTodo(todo);
            }}>Add Todo</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedTodo.title}.</p>
    </>
  );
}
