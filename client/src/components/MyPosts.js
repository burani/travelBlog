import React, {useState, useEffect, useLayoutEffect} from 'react'
import Post from './Post';
import Modal from './Modal';

import axios from 'axios';
import { getJwt } from '../helpers/jwt';
// это будет список всех постов.


const MyPosts = (props) => {


    const [posts, setPosts] = useState([]);

    const [user, setUser] = useState([]);

    const [show, setShow] = useState(false);


    const [curPost, setCurPost] = useState({});


    useEffect(() => {
        const jwt = getJwt();

        // Если пользователь не зашел, то перенаправить его на страницу логина
        // if (!jwt){
        //     props.history.push('/Login');
        // }
        axios.get('api/user/getUser', {headers: {"auth-token": jwt}}).then(res => {
            setUser(res.data);
        }).catch(err => {
            localStorage.removeItem('jwt');
            props.history.push('/Login');
        })



        loadMyPosts();
        
    }, []);



    function loadMyPosts(){

        const jwt = getJwt();

        axios.get('api/posts/getUserPosts', {headers: {"auth-token": jwt}}).then(res => {
            setPosts(res.data);
        }).catch(err => {
            // localStorage.removeItem('jwt');
            // props.history.push('/Login');
            console.log(err);
        })
    }


    // function resetPosts(){
    //     setPosts([]);
    // }



    function deleteClicked(postId){
        const jwt = getJwt();

        console.log("deleting");
        axios.delete(
            'api/posts/deletePost',
            {headers: {"auth-token": jwt},
            data: {id: postId}}
          ).then(res => {
            console.log(postId);
            console.log('deleted');
            loadMyPosts()
        }).catch(err => {
            // localStorage.removeItem('jwt');
            // props.history.push('/Login');
            console.log(err);
        });
        
    }

    function showModal(post){
        console.log(post);
        setCurPost(post);
        setShow(!show);
    }
    


    return (
        <div className="myPostContainer">
            <ul className="myPostList">
                {
                    posts.map(post => <li key={post._id} className="postLi">
                        <Post {...post}/>
                        <button name={post._id} onClick={function(e){console.log(e.target.name);deleteClicked(e.target.name)
                        }}>delete</button>
                        

                        <button onClick={function(e){showModal(post)}}>update</button>
                        
                    </li>)
                }

                <br/>
                
            </ul>
            <Modal {...curPost} show={show} onClose={showModal} show={show} loadMyPosts={loadMyPosts}/>
        </div>
        

        
    )
};

export default MyPosts;