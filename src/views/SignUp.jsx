import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

function SignUp(){
    const [formData, setFormData] = useState({
        email : '',
        password : '',
        nickname : '',
        pwd : ''
    })
    const [btnDisable, setBtnDisable] = useState(false);
    const [showEmailErr, setShowEmailErr] = useState(false);
    const [showPasswordErr, setShowPasswordErr] = useState(false);
    const [showNicknameErr, setShowNicknameErr] = useState(false);
    const [showPwdErr, setShowPwdErr] = useState(false);
    const navigate = useNavigate() // 把 hook 取出來做使用


    const handleChg = (e) => {
        const {name} = e.target;
        setFormData({
            ...formData,
            [name] : e.target.value
        });
        if(name === 'nickname'){
            !e.target.value ? setShowNicknameErr(true) : setShowNicknameErr(false);
        }
        if(name === 'email'){
            !e.target.value ? setShowEmailErr(true) : setShowEmailErr(false);
        }
        if(name === 'password'){
            !e.target.value ? setShowPasswordErr(true) : setShowPasswordErr(false);
        }
    }

    const checkPwd = (e) => {
        const {name} = e.target;
        let password;
        let pwd;
        if(name === 'password'){
            password = e.target.value;
            pwd = formData.pwd;
        }else{
            pwd = e.target.value;
            password = formData.password;
        }
        password !== pwd ? setShowPwdErr(true) : setShowPwdErr(false);        
    }

    const signUp = async() => {
        try{
            setBtnDisable(true);
            const {email, nickname, password, pwd} = formData;
            !email ? setShowEmailErr(true) : setShowEmailErr(false);
            !password ? setShowPasswordErr(true) : setShowPasswordErr(false);
            !nickname ? setShowNicknameErr(true) : setShowNicknameErr(false);
            password !== pwd ? setShowPwdErr(true) : setShowPwdErr(false);
            if(!showPwdErr){
                await useAxios.SIGNUP(formData);
                alert('註冊成功。');
                navigate('/');
            }else{
                alert('密碼輸入不一致');
            }
            
        }catch(e){
            //console.log(e.response.data.message);
            alert(e.response.data.message);
        }finally{
            setBtnDisable(false);
        }
    }


return(
    <div>
        <form className="formControls" action="">
            <h2 className="formControls_txt">註冊帳號</h2>
            
            <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
            <input className="formControls_input" 
            type="text" name="nickname" id="nickname" 
            placeholder="請輸入您的暱稱" onChange={handleChg}/>
            {showNicknameErr ? <span>暱稱為必填</span> : <span/>}

            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" 
            type="text" id="email" name="email" 
            placeholder="請輸入 email" onChange={handleChg}/>
            {showEmailErr ? <span>Email為必填</span> : <span/>}

            <label className="formControls_label" htmlFor="password">密碼</label>
            <input className="formControls_input" 
            type="password" name="password" id="password" 
            placeholder="請輸入密碼" onChange={e => {handleChg(e); checkPwd(e)}}/>
            {showPasswordErr ? <span>密碼為必填</span> : <span/>}

            <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
            <input className="formControls_input" 
            type="password" name="pwd" id="pwd" 
            placeholder="請再次輸入密碼" onChange={e => {handleChg(e); checkPwd(e)}}/>
            {showPwdErr ? <span>密碼輸入不一致</span> : <span/>}

            <input className="formControls_btnSubmit" 
            type="button" value="註冊帳號"
            disabled={btnDisable} 
            onClick={signUp}/>
            <NavLink className="formControls_btnLink" to="/">登入</NavLink>            
        </form>
    </div>
    
)
}

export default SignUp;