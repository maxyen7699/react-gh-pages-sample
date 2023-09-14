import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const { VITE_APP_HOST } = import.meta.env;


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
        //console.log(name);
    }

    const login = async() => {
        try{
            setIsLoading(true);
            const {email, password} = formData;
            !email ? setShowEmailErr(true) : setShowEmailErr(false);
            !password ? setShowPasswordErr(true) : setShowPasswordErr(false);
            if(!showEmailErr && !showPasswordErr){
                const response = await axios.post(`${VITE_APP_HOST}/users/sign_in`, formData);
                document.cookie = `token=${response.data.token}`;
                document.cookie = `userName=${response.data.nickname}`;
                console.log(response)
                alert('登入成功。');
                //navigate('/todoList');
                navigate("/todoList/TDLAll");

            }
            setIsLoading(false);
        }catch(e){
            // if(e.response.status === 400){
            //     alert('欄位驗證失敗。');
            // }
            // if(e.response.status === 401){
            //     alert('帳號密碼輸入錯誤。');
            // }
            // if(e.response.status === 404){
            //     alert('用戶不存在。');
            // }
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