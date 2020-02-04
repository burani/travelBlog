import React, {useState, useEffect} from 'react';
import { getJwt } from '../helpers/jwt';
import "../modal.css";

import axios from 'axios';



const Modal = (props) => {
    // console.log(props);

    const onClose = props.onClose;


    const loadMyPosts = props.loadMyPosts;


    const [user, setUser] = useState(undefined);

    const [state, setState] = useState({
        id: "",
        title: "",
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
            setState({
                id: props._id,
                title: props.title,
                text: props.text,
                eventDate: props.eventDate,
                eventLength: props.eventLength,
                category: props.category,
                location: props.location
            });
        }).catch(err => {
            localStorage.removeItem('jwt');
            props.history.push('/Login');
        })

        
    }, []);

    function change(e){
        console.log(state);
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    function updatePost(){

        const jwt = getJwt();

        console.log(props);

        axios.put('api/posts/updatePost', 
        {
        id: props._id,
        title: state.title,
        text: state.text,
        eventDate: state.eventDate,
        eventLength: state.eventLength,
        category: state.category,
        location: state.location}, 
        {headers: {"auth-token": jwt}}).then(res => {
            console.log("Post updated");
            onClose();
            loadMyPosts()
        }).catch(err => {
            console.log(err);
        })
        // Здесь надо обновить посты.
    }

    if (props.show) {return (  

        <div className="modal">
            
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Update Post</h2>
                </div>
            <div className="modal-body">
                {/* {props.title} */}
                <label>title:</label><input type="text" name="title" onChange={e => change(e)} value={state.title}/>
                <label>text:</label><input type="text" name="text" onChange={e => change(e)} value={state.text}/>
                <label>eventDate:</label><input type="date" name="eventDate" onChange={e => change(e)} value={state.eventDate}/>
                <label>eventLength:</label><input type="text" name="eventLength" onChange={e => change(e)} value={state.eventLength}/>
                <label>category:</label><input type="text" name="category" onChange={e => change(e)} value={state.category}/>
                <label>location:</label><input type="text" name="location" onChange={e => change(e)} value={state.location}/>
                <button onClick={updatePost}>Update</button>
            </div>

            <div className="modal-footer">
                <button className="closeButton" onClick={e => {
                    onClose();
                }}>
                    Close
                </button>
            </div>
        </div>
        </div>
        
    )} else {
        return null;
    }
};

export default Modal;