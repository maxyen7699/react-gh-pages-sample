import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/LogIn";
import TodoList from "./views/TodoList";
import TDLAll from "./views/TDLAll";
import TDLFin from "./views/TDLFin";
import TDLUnFin from "./views/TDLUnFin";
import NotFoundPage from "./views/NotFoundPage";

function App(){
return(
    <div>
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route index element={<Login/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
            </Route>
            
            <Route path="/todoList" element={<TodoList/>}>
                    {/*<Route path="TDLAll" element={<TDLAll/>} />
                    <Route path="TDLUnFin" element={<TDLUnFin/>} />
<Route path="TDLFin" element={<TDLFin/>} />*/}
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </div>
    )
}

export default App;
