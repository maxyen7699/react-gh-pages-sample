import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/LogIn";
import TodoList from "./views/TodoList";
import NotFoundPage from "./views/NotFoundPage";

function App(){
return(
    <div>
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route index element={<Login/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
            </Route>
            <Route path="/todoList" element={<TodoList/>}></Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </div>
    )
}

export default App;
