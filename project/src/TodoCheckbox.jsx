import React from "react";

export default function Checkbox({ onClick, defaultChecked }) {
    return <input type="checkbox" onClick={onClick} defaultChecked={defaultChecked} />
}