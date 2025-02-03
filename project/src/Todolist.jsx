import React from "react";
import Button from "./TodoButton";
import Checkbox from "./TodoCheckbox";

export default function TodoList({ list, onChangeBox, handleDel }) {
    return (
        <ul>
            {list.map(todo => (
                <li key={todo.id}>
                    <Checkbox
                        onClick={() => onChangeBox(todo)}
                        defaultChecked={todo.done}
                    />{" "}
                    {todo.name}
                    <Button onClick={() => handleDel(todo)}>Delete</Button>
                </li>
            ))}
        </ul>
    );
}