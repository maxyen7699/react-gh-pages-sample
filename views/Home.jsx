import { Outlet } from "react-router-dom";
function Home(){
return(
    <>
    <div className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
            <div className="side">
                    <a href="#">
                        <img src='images/todoListTitle.png' />
                    </a>
                    <img className="d-m-n" src='images/todoListTitle2.png' />
            </div>
            <Outlet/>
        </div>
    </div>
    
    </>
)
}

export default Home;