import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';
import { useContext } from 'react';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
     const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    else {
      axios.get('http://localhost:3001/posts', {
        headers: { accessToken: localStorage.getItem("accessToken") }
      })
      .then((response) => {
        const posts = response.data?.listofPosts || [];
        const liked = response.data?.likedPosts || [];

        setListOfPosts(posts);
        setLikedPosts(liked.map((like) => like.PostId));
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }
  }, []);


  const likeAPost = (postId) => {
    axios.post('http://localhost:3001/likes', {PostId: postId}, {
      headers: {accessToken: localStorage.getItem("accessToken")}
    }).then((response)=>{
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.liked) {
            // If the post was liked, add a like
            return {
              ...post,
              Likes: [...post.Likes, 0]
            };
          }
          else {
            // If the post was unliked, remove a like
            return {
              ...post,
              Likes: post.Likes.slice(0, -1) // Remove the last like
            };
          }
        }
        return post;
      })); 
      // if(likedPosts.includes(postId)) {
      //   setLikedPosts(likedPosts.filter((id) => id != postId)); // Remove from liked posts
      // }
      // else {
      //   setLikedPosts([...likedPosts, postId]); // Add to liked posts
      // }
    })
  }

  return (
    <div className='postContainer'>
      {listOfPosts.map((value, key)=>{
      return (
        <div className="post"  key={key}>
          <div className="title">{value.title}</div>
          <div className="body" onClick={()=>{navigate(`/post/${value.id}`)}}>{value.postText}</div>
          <div className="footer">
            <div className='username'>
              <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
            </div>
              <div className='buttons'>
                <ThumbUpIcon 
                  onClick={()=>{
                    likeAPost(value.id)}}
                  className={likedPosts.includes(value.id) ? "unlikeButton" : "likeButton"}
                />
                <label> {value.Likes.length}</label>
              </div>
          </div>
        </div>
      );
    })}
    </div>
  )
}

export default Home
