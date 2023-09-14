import React, { useEffect, useState } from "react";
import TodoData from "../component/TodoData";
import TodoListTab from "../component/TodoListTab";
import { NavLink } from "react-router-dom";
import useAxios from "../hooks/useAxios";


function TDLFin (){
    const [todoList, setTodoList] = useState([]);

    const getTodoList = () => {
        useAxios.GET()
        .then((res) => {setTodoList(res);})
        .catch((err) => console.log(err.response.data));
    }

    const deleteTodo = (id) => {
        useAxios.DELETE(id)
        .catch((err) => console.log(err.response.data));
    }

    const toggleTodo = (id) => {
        useAxios.TOGGLE(id)
        .catch((err) => console.log(err.response.data));
    }

    const deleteAll = () => {
        const delArr = todoList.filter((item) => item.status === true);
        if(delArr.length > 0){
            delArr.map((item) => {
                useAxios.DELETE(item.id)
                .catch((err) => console.log(err.response.data));
            })
        }
        //getTodoList();
    }

    useEffect(() => {
        getTodoList();
    },[todoList])

    return(
        <div className="todoList_list">
            <TodoListTab/>
            <div className="todoList_items">
                <ul className="todoList_item">
                    {todoList.filter((todo) => {
                        return todo.status === true
                    }).map((todo, index) => (
                        <TodoData key={index} index={index} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
                    ))}                   
                </ul>
                <div className="todoList_statistics">
                    <p> {todoList.filter((todo)=>{
                        return todo.status !== true;
                    }).length} 個待完成項目</p>
                    <NavLink to="#" onClick={deleteAll}>清除已完成項目</NavLink>
                </div>
            </div>
        </div>
    )
}
export default TDLFin;