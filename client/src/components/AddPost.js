import React, {useState, useEffect} from 'react'
import { getJwt } from '../helpers/jwt';
import { startSession } from 'mongoose';

import axios from 'axios';

const AddPost = (props) => {


    // В этом стейте будет хранится текущий пользователь
    const [user, setUser] = useState(undefined);

    const [state, setState] = useState({
        title: "",
        user: "",
        text: "",
        eventDate: "",
        eventLength: "",
        category: "",
        location: "",

    })


    useEffect(() => {
        const jwt = getJwt();

        console.log(jwt);
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


    function change(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        // console.log(state);
    }


    function submit(e){//здесь надо изменить url для логина.

        e.preventDefault();

        const jwt = getJwt();
        axios.post('/api/posts/addPost', {
            title: state.title,
            user: user._id,
            text: state.text,
            eventDate: state.eventDate,
            eventLength: state.eventLength,
            category: state.category,
            location: state.location,
        }, {headers: {"auth-token": jwt}}).then(res => {
            // console.log("JWT TOKEN: " + res.data);
            // localStorage.setItem('jwt', res.data);
            // console.log(state.email + " " + state.password);
            // props.history.push("/Protected");  
            console.log(res.data);
            alert("your post has been added");
            setState({
                title: "",
                user: "",
                text: "",
                eventDate: "",
                eventLength: "",
                category: "",
                location: "",
        
            });
        }).catch(function(error){
            // console.log(state.email + " " + state.password);
            console.log("Did not add post");
            console.log(error);
        });
    }

    // title: "",
    // user: "",
    // text: "",
    // eventDate: "",
    // eventLength: "",
    // category: "",
    // location: "",
    return (
        <div className="login-box">
            <form onSubmit={e => submit(e)}>
                <label>title:</label><input type="text" name="title" onChange={e => change(e)} value={state.title}/>
                <label>text:</label><input type="text" name="text" onChange={e => change(e)} value={state.text}/>
                <label>eventDate:</label><input type="date" name="eventDate" onChange={e => change(e)} value={state.eventDate}/>
                <label>eventLength:</label><input type="text" name="eventLength" onChange={e => change(e)} value={state.eventLength}/>
                <label>category:</label><input type="text" name="category" onChange={e => change(e)} value={state.category}/>
                <label>location:</label><input type="text" name="location" onChange={e => change(e)} value={state.location}/>

                <button type="submit">Submit</button>

            </form>
        </div>
    )
    


    console.log(user);

    
};

export default AddPost;