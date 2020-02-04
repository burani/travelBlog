import React from 'react';
import PostList from './PostList';
import Nav from './Nav';
// Это будет наша домашняя страница для приложения. Здесь будут отображаться все посты. В нав баре можно сделать отображение пользователя, в зависимости от того, зашел он или нет. 



const Home = () => {
    return (  

        
        <div className="container">
            
            {/* <Nav/> */}

            {/* <NavBar></NavBar> */}

            {/* <Nav></Nav> */}
            <PostList></PostList>
        </div>
    )
};

export default Home;