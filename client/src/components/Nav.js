import React, {useState, useEffect} from 'react';
// import { getJwt } from '../helpers/jwt';







const Nav = (props) => {
    

    return (  

        
        <div className="nav">
            <ul>
                <li><a href="http://localhost:3000/">Home</a></li>
                <li><a href="http://localhost:3000/addPost">Add Post</a></li>
                <li><a href="http://localhost:3000/myPosts">My Posts</a></li>
                <li><a href="http://localhost:3000/login">{props.loggedIn? "Logout": "Login"}</a></li>
                <li><a href="http://localhost:3000/register">Register</a></li>
                
            </ul>
                        

            
        </div>
    )
};

export default Nav;