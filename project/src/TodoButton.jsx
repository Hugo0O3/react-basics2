import React from "react"
import shrek from "./assets/shrekWaw.jpg"

export default function Button({ onClick, children }) {
    return <button className="boutonDroit" type="button" onClick={onClick}>{children}
        {/* <img src={shrek} alt="image shrek"></img> */}
    </button>

}