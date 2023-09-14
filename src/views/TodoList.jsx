import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AddTodo from "../component/AddTodo";
const { VITE_APP_HOST } = import.meta.env;

function TodoList (){
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [newTodo, setNewTodo] = useState('');


    const signOut = async() => {
        try{
            await axios.post(`${VITE_APP_HOST}/users/sign_out`);
            navigate("/");
        }catch(e){
            console.log(e);
        }
    }


    // useEffect(() => {
    //     // 取得 Cookie
    //     const cookieValue = document.cookie
    //       .split("; ")
    //       .find((row) => row.startsWith("token="))
    //       ?.split("=")[1];
    //     // get userName
    //     setUserName(
    //         document.cookie
    //       .split("; ")
    //       .find((row) => row.startsWith("userName="))
    //       ?.split("=")[1]
    //     );
    //     // 預設 axios 的表頭
    //     axios.defaults.headers.common['Authorization'] = cookieValue;
    //   }, []);

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
                    <li><NavLink to="#" onClick={signOut}>登出</NavLink></li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <AddTodo newTodo={newTodo} setNewTodo={setNewTodo}/>
                </div>        
                <Outlet/>  
            </div>
        </div>

    )
}

export default TodoList;