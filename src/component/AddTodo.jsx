import { NavLink } from "react-router-dom";
import useAxios from "../hooks/useAxios";

function AddTodo ({newTodo, setNewTodo, addTodo, keydown}) {
    
    
    
return(
    <div className="inputBox">
        <input type="text" placeholder="請輸入待辦事項" value={newTodo}
            onChange={(e) => {
                setNewTodo(e.target.value)
            }}
            onKeyDown={(e) => {keydown(e.key)}}/>
        <NavLink to="#" onClick={addTodo}>
            <i className="fa fa-plus" >+</i>
        </NavLink>
    </div>
)
}

export default AddTodo;