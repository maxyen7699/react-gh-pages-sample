import React, { useEffect, useState } from "react";
import AddTodo from "../component/AddTodo";
import axios from "axios";
import TodoData from "../component/TodoData";
import TodoListTab from "../component/TodoListTab";
import { NavLink } from "react-router-dom";
const { VITE_APP_HOST } = import.meta.env;

function TDLFin (){
    const [todoList, setTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const getTodoList = async() => {
        try{
            const response = await axios.get(`${VITE_APP_HOST}/todos`);
            setTodoList(response.data.data);
        }catch(e){
            console.log(e);
        }
    }

    const deleteAll = () => {
        const delArr = todoList.filter((item) => item.status === true);
        try{
            //console.log(delArr);
            if(delArr.length > 0){
                delArr.map(async(del) => {
                    await axios.delete(`${VITE_APP_HOST}/todos/${del.id}`, {});
                });
            }
        }catch(e){
            console.log(e);
        }
        getTodoList();

    }

    const deleteTodo = async(id)=> {
        try{
            //console.log(id);
            await axios.delete(`${VITE_APP_HOST}/todos/${id}`, {});
            getTodoList();
        }catch(e){
            console.log(e);
        }
    }

    const toggleTodo = async(id) => {
        try{
            await axios.patch(`${VITE_APP_HOST}/todos/${id}/toggle`, {});
            getTodoList();
        }catch(e){
            console.log(e);
        }
    } 

    const addTodo = async() => {
        console.log(newTodo);
        if(!newTodo){
            return;
        }
        try{
            const newData = {
                content : newTodo
            }
            console.log(newTodo);
            await axios.post(`${VITE_APP_HOST}/todos`,newData,{});
            setNewTodo('');
            getTodoList();

        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        // 取得 Cookie
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        // 預設 axios 的表頭
        axios.defaults.headers.common['Authorization'] = cookieValue;
        getTodoList();
    },[])

    return(
        <div>
        <div className="todoList_Content">
            <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo}/>
        </div>
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
        </div>
    )
}
export default TDLFin;