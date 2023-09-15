import { NavLink } from "react-router-dom";

function TodoListTab ({tag, chgTag}){
return(
    <ul className="todoList_tab">
        {/*<li><NavLink to="/todoList/TDLAll">全部</NavLink></li>
        <li><NavLink to="/todoList/TDLUnFin">待完成</NavLink></li>
<li><NavLink to="/todoList/TDLFin">已完成</NavLink></li>*/}
        <li>
            <a href='#' className={tag === 'ALL' ? 'active' : ''} 
            onClick={(e)=>{chgTag(e, 'ALL')}}>全部</a>
        </li>
        <li>
            <a href='#' className={tag === 'PENDING' ? 'active' : ''} 
            onClick={(e)=>{chgTag(e, 'PENDING')}}>待完成</a>
        </li>
        <li>
            <a href='#' className={tag === 'FINISHED' ? 'active' : ''} 
            onClick={(e)=>{chgTag(e, 'FINISHED')}}>已完成</a>
        </li>
    </ul>
)
}

export default TodoListTab;