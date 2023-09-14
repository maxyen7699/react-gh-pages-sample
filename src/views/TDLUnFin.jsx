import React, { useEffect, useState } from "react";
import TodoData from "../component/TodoData";
import TodoListTab from "../component/TodoListTab";
import NoDataList from "../component/NoDataList";
import useAxios from "../hooks/useAxios";

function TDLUnFin (){
    const [todoList, setTodoList] = useState([]);

    const getTodoList = () => {
        useAxios.GET().then((res) => {
            setTodoList(res);
        })
        .catch((err) => console.log(err.response.data));

    }

    const toggleTodo = (id) => {
        useAxios.TOGGLE(id)
        .then(() => getTodoList())
        .catch((err) => console.log(err.response.data));
    }

    const deleteTodo = (id) => {
        useAxios.DELETE(id)
        .then(() => getTodoList())
        .catch((err) => console.log(err.response.data));
    }

    useEffect(() => {
        getTodoList();
    },[])

    return(
        <div className="todoList_list">
            <TodoListTab/>
            <div className="todoList_items">
                <ul className="todoList_item">
                    {todoList.length === 0 ?
                        <NoDataList/>
                        :
                        todoList.filter((todo) => {
                            return todo.status !== true
                        }).map((todo, index) => (
                            <TodoData key={index} index={index} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
                        ))
                    }                   
                </ul>
                <div className="todoList_statistics">
                    <p> {todoList.filter((todo)=>{
                        return todo.status !== true;
                    }).length} 個待完成項目</p>
                </div>
            </div>
        </div>
    )
}
export default TDLUnFin;