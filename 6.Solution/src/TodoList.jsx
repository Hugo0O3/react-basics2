const TodoList = (
  { todos, 
    handleCheck, 
    deleteTodo, 
    todoLeft, 
    deleteAllTodosCompleted
  }) => {
  
  return(
      <section className="todos-container">
        <h2>Todos</h2>
        <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo">
            <label htmlFor={todo.id}>
              <input  type="checkbox" 
                      name={todo.name} 
                      id={todo.id} 
                      checked={todo.done}
                      onChange={() => handleCheck(todo.id) }
                      />
                {todo.name}
            </label>
            <button 
              className="btn btn-danger"
              onClick={() => deleteTodo(todo.id)}
              disabled={todo.done ? false : true}
            >
              Delete
            </button>
          </li>
        ))}
        </ul>
        <p>{todoLeft.length} todos left</p>
        <button onClick={deleteAllTodosCompleted}>Delete completed</button>
      </section>
  )
}

export default TodoList