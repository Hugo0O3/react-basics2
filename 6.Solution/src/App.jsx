import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import './App.css'
import Header from './Header'
import Form from './Form';
import TodoList from './TodoList'


const LSKEY = "MyTodoApp";
const initialTodos = JSON.parse(window.localStorage.getItem(LSKEY + ".todos"))

function App() {
  /* const initialTodos = [
    { 
      id: uuidv4(),
      name: "My first todo",
      done: false
    }, 
    { 
      id: uuidv4(),
      name: "My second todo",
      done: true
    }
  ]; */
  // Initialize the state
  const [todos, setTodos] = useState(initialTodos ?? []);
  const todoLeft = todos.filter(todo => !todo.done);

  // Add a todo to the state
  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), name: todo, done: false }]);
  }

  //Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(
      todo => todo.id !== id
    ))
  }

  const deleteAllTodosCompleted = () => {
    const todosNotCompleted = todos.filter(todo => !todo.done)
    setTodos(todosNotCompleted)
  }

  // Handle checkbox status
  const handleCheck = (id) => {
    setTodos( todos.map(todo => {
        if(todo.id === id) {
          return {
            ...todo, 
            done: !todo.done
          }
        }
        return todo
      })
    )
  }

  // Save todos to localStorage
  useEffect(() => {
    window.localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
  }, [todos]);

  return(
    <>
      <Header />
      <main>
        <Form addTodo={addTodo} />
        <TodoList 
          todos={todos} 
          handleCheck={handleCheck} 
          deleteTodo={deleteTodo} 
          todoLeft={todoLeft}
          deleteAllTodosCompleted={deleteAllTodosCompleted}
        />
      </main>
    </>
  )
}

export default App
