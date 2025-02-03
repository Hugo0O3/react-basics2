import React, { Component } from "react";
import Button from "./TodoButton";
import TodoList from "./Todolist";
import Input from "./TodoInput";
import "./App.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todoText: ""
        };
    }

    onChangeInput = e => {
        this.setState({ todoText: e.target.value });
    };

    onSubmitTodo = () => {
        if (this.state.todoText.trim() === "") return
        this.setState(({ todos, todoText }) => ({
            todos: [...todos, { id: todos.length + 1, name: todoText, done: false }],
            todoText: ""
        }));
    };

    onChangeBox = item => {
        this.setState(({ todos }) => ({
            todos: todos.map(el =>
                el.id === item.id ? { ...el, done: !el.done } : el
            )
        }));
    };

    handleDel = item => {
        this.setState(({ todos }) => ({
            todos: todos.filter(el => el.id !== item.id)
        }));
    };

    render() {
        const { todos, todoText } = this.state;

        return (
            <>
                <section className="container">
                    <h1>My todo App</h1>
                </section>
                <section className="formContainer">
                    <form action="#">
                        <Input value={todoText} onChange={this.onChangeInput} />
                        <Button onClick={this.onSubmitTodo}>Add todo</Button>
                    </form>
                </section>
                <TodoList
                    list={todos}
                    onChangeBox={this.onChangeBox}
                    handleDel={this.handleDel}
                />
            </>
        );
    }
}
