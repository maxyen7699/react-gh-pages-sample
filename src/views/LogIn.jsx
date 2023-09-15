import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

function Login(){

    const [formData, setFormData] = useState({
        email : '',
        password : ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showEmailErr, setShowEmailErr] = useState(false);
    const [showPasswordErr, setShowPasswordErr] = useState(false);
    const navigate = useNavigate();


    const handleChg = (e) => {
        const {name} = e.target;//取得tag的name屬性
        setFormData({
            ...formData,
            [name] : e.target.value
        });
        if(name === 'email'){
            !e.target.value ? setShowEmailErr(true) : setShowEmailErr(false);
        }
        if(name === 'password'){
            !e.target.value ? setShowPasswordErr(true) : setShowPasswordErr(false);
        }
    }

    const login = async() => {
        try{
            setIsLoading(true);
            const {email, password} = formData;
            !email ? setShowEmailErr(true) : setShowEmailErr(false);
            !password ? setShowPasswordErr(true) : setShowPasswordErr(false);
            if(!showEmailErr && !showPasswordErr){
                const response = await useAxios.LOGIN(formData);
                document.cookie = `token=${response.token}`;
                document.cookie = `userName=${response.nickname}`;
                alert('登入成功。');
                navigate('/todoList');
            }
            setIsLoading(false);
        }catch(e){
            alert(e.response.data.message);
            setIsLoading(false);
        }
    }

    return(
        <div>
            <form className="formControls" action="">
                <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>  
                <label className="formControls_label" htmlFor="email">Email</label>
                <input type="email" className="formControls_input" 
                placeholder="Email" id="email" name="email"  onChange={handleChg}/> 
                {showEmailErr ? <span>此欄位不可留空</span> : <span/> }
                <label className="formControls_label" htmlFor="password">密碼</label>
                <input type="password" className="formControls_input" 
                placeholder="Password" id="password" name="password" onChange={handleChg}/>
                {showPasswordErr ? <span>此欄位不可留空</span> : <span/> }
                <button type="button" className="formControls_btnSubmit"
                disabled={isLoading}
                onClick={login}>登入</button>
                <NavLink className="formControls_btnLink" to="/SignUp">註冊帳號</NavLink>
            </form>
        </div>
        
    )
}

export default Login;