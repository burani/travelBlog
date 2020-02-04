import React, {useState, useEffect, useLayoutEffect} from 'react'
import Post from './Post';
import axios from 'axios';
import { getJwt } from '../helpers/jwt';
// это будет список всех постов.


const PostList = (props) => {


    const [posts, setPosts] = useState([]);


    const [state, setState] = useState({
        pagination: 8,
        page: 1,
        totalPages: null
    })


    const [type, setType] = useState("");

    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        const jwt = getJwt();

        // Если пользователь не зашел, то перенаправить его на страницу логина
        // if (!jwt){
        //     props.history.push('/Login');
        // }
        loadPosts();
        setDidMount(true);
    }, []);



    function loadPosts(){

        const { pagination, page } = state;
        // const type = type;
        axios.get('api/posts/getPosts' + `?pagination=${pagination}&page=${page}&type=${type}`).then(res => {
            setPosts([...posts, ...res.data.posts]);
        }).catch(err => {
            // localStorage.removeItem('jwt');
            // props.history.push('/Login');
            console.log(err);
        })
    }


    // function resetPosts(){
    //     setPosts([]);
    // }

    const loadMore = () =>{
        console.log("load more pressed");
        setState(prevState => ({
            ...state,
            page: prevState.page + 1
        }))
    }


    function click(e){
        e.preventDefault();
        // Сначала нужно сбросить прошлые посты.

        // loadPosts();
        
        // setPosts([]);

        // loadPosts();
        console.log("clicking");
        console.log(e.target.name);

        if (e.target.name == type){
            return;
        }

        setPosts([]);

        // resetPosts()
        setType(e.target.name);
        // console.log(type)
        // loadPosts();
        
    }

    // function resetPosts(callback){
    //     setPosts([]);
    //     callback();
    // }

    // Побочный эффект для изменения state
    useEffect(() => {
        
        loadPosts();
        
    }, [state]);


    useEffect(() => {
        // Это чтобы не вызывать с самого начала.
        if (didMount){
            console.log("loading more");
            console.log(type);
            setState({
                pagination: 8,
                page: 1,
                totalPages: null
            });
            // loadPosts(); здесь не надо, потому что она и так вызовется в useEffect
        }
        
    }, [type]);

    let count = 0;

    // useEffect(() => {
    //     console.log("resetting");
    //     setPosts([]);
    //     loadPosts();
        
    // }, [type]);



    function getCurrentType(){
        if (type == '') return 'All posts'
        else return type.charAt(0).toUpperCase() + type.substring(1);
    }

    return (
        <div className="postContainer">

            <div className="showCase">
                <h2>{getCurrentType()}</h2>
            </div>

            <div className="buttonContainer">

                <button onClick={e => click(e)} className="typeButton" name="">All</button>
                <button onClick={e => click(e)} className="typeButton" name="camping">Camping</button>
                <button onClick={e => click(e)} className="typeButton" name="climbing">Climbing</button>
                <button onClick={e => click(e)} className="typeButton" name="cycling">Cycling</button>
                <button onClick={e => click(e)} className="typeButton" name="diving">Diving</button>
                <button onClick={e => click(e)} className="typeButton" name="hiking">Hiking</button>
            </div>
            
            <ul className="postList">
                {
                    posts.map(post => <li key={post._id} className="postLi">
                        <Post {...post}/>
                    </li>)
                }

                <br/>
                
            </ul>
            <a onClick={loadMore} className="loadLink">Load more</a>
        </div>
        

        
    )
};

export default PostList;