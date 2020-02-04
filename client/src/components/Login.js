import React, {useState, useEffect} from 'react'
import { startSession } from 'mongoose';
import axios from 'axios';

import { getJwt } from '../helpers/jwt';

const Login = (props) => {

    const [state, setState] = useState({
        email: "",
        password: ""
    })



    useEffect(() => {
        const jwt = getJwt();

        console.log(jwt);
        if (jwt){
            localStorage.removeItem('jwt');
            props.history.push('/Register');
        }

    }, []);


    function change(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        // console.log(state);
    }


    function submit(e){//здесь надо изменить url для логина.
        e.preventDefault();
        axios.post('/api/user/login', {
            email: state.email,
            password: state.password
        }).then(res => {
            console.log("JWT TOKEN: " + res.data);
            localStorage.setItem('jwt', res.data);
            // console.log(state.email + " " + state.password);
            props.history.push("/");  
        }).catch(function(error){
            // console.log(state.email + " " + state.password);
            console.log("Did not redirect");
            console.log(error);
        });
    }
    return (
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={e => submit(e)}>
                <label>email: </label><input type="text" name="email" onChange={e => change(e)} value={state.email}/>
                <label>password: </label><input type="password" name="password" onChange={e => change(e)} value={state.password}/>

                <button type="submit">Submit</button>

            </form>
        </div>
    )
};

export default Login;