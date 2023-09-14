import { NavLink } from "react-router-dom";
import useAxios from "../hooks/useAxios";

function AddTodo ({newTodo, setNewTodo}) {
    
    const addTodo = () => {
        if(!newTodo){
            return;
        }
        const newData = {
            content : newTodo
        };
        useAxios.ADD(newData)
        .then(() => {
            setNewTodo('');
        })
        .catch((err) => console.log(err.response.data));

    }
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