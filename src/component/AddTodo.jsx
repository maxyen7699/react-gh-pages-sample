import { NavLink } from "react-router-dom";

function AddTodo ({newTodo, setNewTodo, addTodo}) {
return(
    <div className="inputBox">
        <input type="text" placeholder="請輸入待辦事項" value={newTodo}
            onChange={(e) => {
                setNewTodo(e.target.value)
            }}/>
        <NavLink to="#">
            <i className="fa fa-plus" onClick={addTodo}>+</i>
        </NavLink>
    </div>
)
}

export default AddTodo;