import React, { useState, useEffect } from "react";
import Button from "./TodoButton";
import TodoList from "./Todolist";
import Input from "./TodoInput";
import "./App.css";

export default function App() {

    const [todos, setTodos] = useState([])
    const [todoText, setTodoText] = useState('')
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')
    const [todosLeft, setTodosLeft] = useState(0)
    const [showDone, setShowDone] = useState(false)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        const remainingTodos = todos.filter(todo => !todo.done).length;
        setTodosLeft(remainingTodos);
    }, [todos]);


    const onChangeInput = (e) => {
        setTodoText(e.target.value)
    };

    const onSubmitTodo = () => {
        if (todoText.trim() === "") return
        setTodos([...todos, { id: Date.now(), name: todoText, done: false }])
        setTodoText("")
    };

    const onChangeBox = (item) => {
        setTodos(todos.map(todo =>
            todo.id === item.id ? { ...todo, done: !todo.done } : todo
        ))
    };

    const handleEdit = (item) => {
        setEditId(item.id)
        setEditText(item.name)
    }

    const handleEditSave = () => {
        setTodos(todos.map(todo =>
            todo.id === editId ? { ...todo, name: editText } : todo
        ))
        setEditId(null)
        setEditText('')
    }

    const handleDel = (item) => {
        setTodos(todos.filter(todo => todo.id !== item.id))
    };

    const handleDeleteChecked = () => {
        setTodos(todos.filter(todo => !todo.done))
    }

    const deleteAll = () => {
        {/* Méthode pour flex */ }
        // setTodos(todos.filter(todo => todo.done && !todo.done))

        setTodos([])
    }

    const filterTodos = todos.filter(todo => !showDone || todo.done)

    const todosDone = todos.some(todo => todo.done)

    return (
        <>
            <section className="container">
                <h1>My todo App</h1>
                <p>{todosLeft} todos left</p>
            </section>
            <section className="formContainer">
                <form onSubmit={(e) => e.preventDefault()}>
                    <Input value={todoText} onChange={onChangeInput} />
                    <Button onClick={onSubmitTodo}>Add todo</Button>
                </form>
            </section>
            <TodoList
                list={filterTodos}
                onChangeBox={onChangeBox}
                handleDel={handleDel}
                handleEdit={handleEdit}
                handleEditSave={handleEditSave}
                editId={editId}
                editText={editText}
                setEditText={setEditText}
            />
            <Button onClick={handleDeleteChecked}>Remove tasks checked</Button>
            <Button onClick={deleteAll}>Remove All</Button>

            <Button onClick={() => setShowDone(false)}>Show All</Button>
            {todosDone && <Button onClick={() => setShowDone(true)}>Show Done</Button>}
        </>
    );  
}
