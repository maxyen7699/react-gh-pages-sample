import { NavLink } from "react-router-dom";


function TodoData ({index, todo, deleteTodo, toggleTodo}){
    return(
        <li key={index}>
            <label className="todoList_label">
                <input className="todoList_input" type="checkbox" 
                    checked={todo.status} value='true'
                    onChange={(e) => {
                        toggleTodo(todo.id);
                    }}/>
                <span>{todo.content}</span>
            </label>
            <NavLink to="#">
                <i className="fa fa-times" onClick={() => deleteTodo(todo.id)}>x</i>
            </NavLink>
        </li>    
    )
}

export default TodoData;