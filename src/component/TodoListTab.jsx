import { NavLink } from "react-router-dom";

function TodoListTab (){
return(
    <ul className="todoList_tab">
        <li><NavLink to="/todoList/TDLAll">全部</NavLink></li>
        <li><NavLink to="/todoList/TDLUnFin">待完成</NavLink></li>
        <li><NavLink to="/todoList/TDLFin">已完成</NavLink></li>
    </ul>
)
}

export default TodoListTab;