
const Todo = ({todo, handleCheck}) => {
  
  return(
    <li key={todo.id} className="todo">
      <label htmlFor={todo.name}>
        <input  type="checkbox" 
                name={todo.name} 
                id={todo.id} 
                checked={todo.done}
                onChange={e => handleCheck(todo.id, e.target.checked)}
                />
          {todo.name}
      </label>
      <button className="btn btn-danger">Delete</button>
    </li>
  )
}

export default Todo
