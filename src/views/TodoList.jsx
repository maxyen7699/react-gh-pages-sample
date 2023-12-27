import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import TodoListTab from "../component/TodoListTab";
import NoDataList from "../component/NoDataList";
import AddTodo from "../component/AddTodo";
import TodoData from "../component/TodoData";

function TodoList (){
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [newTodo, setNewTodo] = useState('');
    const [oriTodoList , setOriTodoList] = useState([]);//原始資料
    const [todoList, setTodoList] = useState([]);//顯示用資料
    const [tag, setTag] = useState('ALL');

    const logOut = () => {
        useAxios.LOGOUT()
        .then(() => navigate("/"));
    }

    const chgTag = (e, tag) => {
        e.preventDefault();
        setTag(tag);
    }

    const getTodoList = async() => {
        try{
            const res = await useAxios.GET();
            setOriTodoList(res);
            if(tag === 'ALL'){
                setTodoList(res);
            }
            else if(tag === 'PENDING'){
                setTodoList(res.filter((todo) => {return todo.status === false}));
            }
            else if(tag === 'FINISHED'){
                setTodoList(res.filter((todo) => {return todo.status === true}));
            }
        }catch(e){
            alert(e.response.data.message);
        }
    }

    const addTodo = async() => {
        if(!newTodo){
            return;
        }
        try{
            const newData = {
                content : newTodo
            };
            await useAxios.ADD(newData);
            setNewTodo('');
            getTodoList();
            setTag('ALL');
            navigate('/todoList');
        }catch(e){
            alert(e.response.data.message);
        }
    }

    const deleteTodo = async(id) => {
        try{
            await useAxios.DELETE(id);
        }catch(e){
            alert(e.response.data.message);
        }finally{
            getTodoList();
        }
    }

    const deleteAll = () => {
        const delArr = oriTodoList.filter((todo) => {return todo.status === true});
        if(delArr.length > 0){
            delArr.map((data) => {
                deleteTodo(data.id);
            })
        }
    }

    const toggleTodo = (id) => {
        useAxios.TOGGLE(id)
        .then(() => getTodoList())
        .catch((err) => console.log(err.response.data));
    }

    //用onKeyDown偵測特定的案件被按下時執行的function
    const keydown = (val) => {
        if(val === 'Enter'){
            addTodo();
        }
    }

    useEffect(() => {
        // get userName
        setUserName(
            document.cookie
          .split("; ")
          .find((row) => row.startsWith("userName="))
          ?.split("=")[1]
        );
      }, []);

    useEffect(() => {
        getTodoList();
        //alert(tag);
    }, [tag]);

    return(
        <div id="todoListPage" className="bg-half">
            <nav>
                <div>
                    <NavLink to="#">
                        <img src='images/todoListTitle.png' />
                    </NavLink>
                </div>
                <ul>
                    <li className="todo_sm"><NavLink to="#"><span>{userName}的代辦</span></NavLink></li>
                    <li><NavLink to="#" onClick={logOut}>登出</NavLink></li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} keydown={keydown}/>
                </div>        
                <div className="todoList_list">
                    <TodoListTab tag={tag} chgTag={chgTag}/>
                    <div className="todoList_items">
                        <ul className="todoList_item">
                            {todoList.length === 0 ? 
                                <NoDataList tag={tag}/>
                                :
                                todoList.map((todo, index) => (
                                    <TodoData key={index} index={index} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
                                ))              
                            }
                        </ul>
                        <div className="todoList_statistics">
                            <p> {oriTodoList.filter((todo)=>{
                                return todo.status !== true;
                            }).length} 個待完成項目</p>
                            <NavLink to="#" onClick={deleteAll} hidden={tag !== 'FINISHED' ? true : false}>清除已完成項目</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TodoList;