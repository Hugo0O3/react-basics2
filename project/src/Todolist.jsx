import React from "react";
import Button from "./TodoButton";
import Checkbox from "./TodoCheckbox";

export default function TodoList({ list, onChangeBox, handleDel, handleEdit, handleEditSave, editId, editText, setEditText }) {
    return (
        <ul>
            {list.map(todo => (
                <li key={todo.id} className={todo.done ? "done" : ""}>
                    <Checkbox
                        onChange={() => onChangeBox(todo)}
                        defaultChecked={todo.done}
                    />
                    {/* Mode édition --> affichage input ici */}
                    {editId === todo.id ? (
                        <input type="text" value={editText}
                            onChange={(e) => setEditText(e.target.value)}>
                        </input>
                    ) : (
                        <p>{todo.name}</p>
                    )}
                    {/* Mode édition mais ici bouton save */}
                    {editId === todo.id ? (
                        <Button onClick={handleEditSave}>Save</Button>
                    ) : (
                        <Button onClick={() => handleEdit(todo)}>Edit</Button>
                    )}

                    <Button onClick={() => handleDel(todo)}>Delete</Button>
                </li>
            ))}
        </ul>
    );
}