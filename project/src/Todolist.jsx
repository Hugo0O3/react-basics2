import React from "react";
import { useState } from "react";

function Todolist() {
    
    const [todo, setTodo] = useState([])
    const [todoInput, setTodoInput] = useState([])

    return (
        <>
            <h1>My Todo App</h1>
            <form action="#">
                <input type="text" id="todo-input" name="todo" placeholder="Type a new todo" />
                <br />
                <button type="submit">Add Todo</button>
            </form>
            <h2>Todos</h2>
            <section>
                <input type="checkbox" /><label for="learn"> Learn React!</label><br />
                <input type="checkbox" /><label for="awesome"> Be awesome!</label><br />
                <input type="checkbox" /><label for="fun"> Have fun les pioupious 🐤!</label>
            </section>
        </>
        
    )
}

export default Todolist