import React, {useState, useEffect} from 'react'
import { getJwt } from '../helpers/jwt';
import {withRouter} from 'react-router-dom';
import { startSession } from 'mongoose';

import axios from 'axios';

const AuthenticatedComponent = (props) => {


    // В этом стейте будет хранится текущий пользователь
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const jwt = getJwt();

        // Если пользователь не зашел, то перенаправить его на страницу логина
        if (!jwt){
            props.history.push('/Login');
        }

        axios.get('api/user/getUser', {headers: {"auth-token": jwt}}).then(res => {
            setUser(res.data);
        }).catch(err => {
            localStorage.removeItem('jwt');
            props.history.push('/Login');
        })
    }, []);



    if (user === undefined){
        return (<div><h1>Loading...</h1></div>);
    } else{
        console.log(user);
        return (
            <div>
                {props.children}
            </div>
        )
    }


    console.log(user);

    
};

export default withRouter(AuthenticatedComponent);