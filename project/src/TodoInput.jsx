import React from "react";

export default function Input({ value, onChange }) {
    return <input className="test" type="text" value={value} onChange={onChange} placeholder="Type a new todo"></input>
}