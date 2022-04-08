import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
export default function Navbar() {
    const { state, dispatch } = useContext(UserContext);
    const navigate =useNavigate();
    const renderList = () => {
        if (state) {
            return [
                <li key={1}>
                    <Link to="/profile">Profile</Link>
                </li>,
                <li key={2}> 
                    <Link to="/createpost">
                        <i className="material-icons" style={{ color: "white" }}>
                            add
                        </i>
                    </Link>
                </li>,
                <li key={100}> 
                <Link to="/myfollowingspost">
                    Fllowings Post
                </Link>
                </li>,
                <button key={8} className="btn waves-effect waves-light" type="submit" name="action" style={{backgroundColor:"transparent",
                    border:"none"
                    }}
                    onClick={()=>{
                        localStorage.clear();
                        dispatch({type:"CLEAR"})
                        navigate('/login')
                    }}
                >
                    Logout
                    

                </button>
            ];
        } else {
            return [
                <li key={3}>
                    <Link to="/login">Login</Link>
                </li>,
                <li key={4}>
                    <Link to="/signup">Signup</Link>
                </li>,
            ];
        }
    };

    return (
        <>
        <div className="navbar-fixed">
            <nav>
            
                <div
                    className="nav-wrapper"
                    style={{ backgroundColor: "rgb(1 133 109)" }}
                >
                    <Link to={state ? "/" : "/login"} className="brand-logo left">
                        Viralit
                    </Link>
                    <ul id="nav-mobile" className="right">
                        {renderList()}
                    </ul>
                </div>
            
            </nav>
            </div>
        </>
    );
}
