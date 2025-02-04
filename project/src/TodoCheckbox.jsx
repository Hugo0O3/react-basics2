import React from "react";

export default function Checkbox({ onChange, defaultChecked }) {
    return <input type="checkbox" onChange={onChange} checked={defaultChecked} />
}