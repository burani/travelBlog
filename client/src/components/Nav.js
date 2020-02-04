import React, {useState, useEffect} from 'react';
import { getJwt } from '../helpers/jwt';







const Nav = () => {
    const [loggedIn, setLoggedIn] = useState("Logout");  
    // function ifLogged(){
    //     if (loggedIn) return "Logout";
    //     else return "Login";
    // }

    
    useEffect(() => {
        const jwt = getJwt();

        console.log(jwt);
        if (jwt){
            setLoggedIn("Logout");
        }
        else{
            setLoggedIn("Login");
        }

    }, []);

    // useEffect(() => {
    //     text = !text;

    // }, [loggedIn]);
    return (  

        
        <div className="nav">
            <ul>
                <li><a href="http://localhost:3000/">Home</a></li>
                <li><a href="http://localhost:3000/addPost">Add Post</a></li>
                <li><a href="http://localhost:3000/myPosts">My Posts</a></li>
                <li><a href="http://localhost:3000/login">{loggedIn}</a></li>
                <li><a href="http://localhost:3000/register">Register</a></li>
                
            </ul>
                        

            
        </div>
    )
};

export default Nav;