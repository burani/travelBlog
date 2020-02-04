import React, {useState, useEffect} from 'react'
import { startSession } from 'mongoose';
import axios from 'axios';
const Register = (props) => {

    const [state, setState] = useState({
        name: "",
        email: "",
        password: ""
    })



    function change(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        // console.log(state);
    }


    // function submit(e){//здесь надо изменить url для логина.
    //     e.preventDefault();
    //     axios.post('/api/user/login', {
    //         email: state.email,
    //         password: state.password
    //     }).then(res => {
    //         console.log("JWT TOKEN: " + res.data);
    //         localStorage.setItem('jwt', res.data);
    //         // console.log(state.email + " " + state.password);
    //         props.history.push("/Protected");  
    //     }).catch(function(error){
    //         // console.log(state.email + " " + state.password);
    //         console.log("Did not redirect");
    //         console.log(error);
    //     });
    // }

    function submit(e){//здесь надо изменить url для логина.
        e.preventDefault();
        axios.post('/api/user/register', {
            name: state.name,
            email: state.email,
            password: state.password
        }).then(res => {
            console.log(`User with email ${state.email} has been created`);
            alert(`User with email ${state.email} has been created`);
            setState({name: "",
            email: "",
            password: ""});   
        }).catch(function(error){
            // console.log(state.email + " " + state.password);
            console.log(error);
        });
    }

    return (
        <div className="register-box">
            <h2>Register</h2>
            <form onSubmit={e => submit(e)}>
                <label>name: </label><input type="text" name="name" onChange={e => change(e)} value={state.name}/>
                <label>email: </label><input type="text" name="email" onChange={e => change(e)} value={state.email}/>
                <label>password: </label><input type="password" name="password" onChange={e => change(e)} value={state.password}/>

                <button type="submit">Sign up</button>

            </form>
        </div>
    )
};

export default Register;