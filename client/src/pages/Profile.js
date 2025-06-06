import React , {useEffect, useState, useContext} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import './Profile.css';

function Profile() {
    let {id} = useParams();
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
     // Uncomment if you want to handle posts
    const { authState } = useContext(AuthContext); // Uncomment if you want to use AuthContext

    useEffect(() => {
        axios.get(`https://fullstackapp-y9y6.onrender.com/auth/basicInfo/${id}`).then((response) => {
            setUsername(response.data.username);
        })

        axios.get(`https://fullstackapp-y9y6.onrender.com/posts/byUserId/${id}`).then((response) => {
            // Handle the list of posts if needed
            setListOfPosts(response.data);
        })
    }, []);

  return (
    <div className="profile">
      <div className='basicInfo'>
        <h1>Username: {username}</h1>
        {authState.username === username && (
          <button onClick={()=>{navigate('/changepassword')}}>Change Password</button>
        )}
      </div>
      <div className='listOfPosts'>
        {listOfPosts.map((value, key)=>{
      return (
        <div className="post"  key={key}>
          <div className="title">{value.title}</div>
          <div className="body" onClick={()=>{navigate(`/post/${value.id}`)}}>{value.postText}</div>
          <div className="footer">
            <div className='username'>{value.username}</div>
              <div className='buttons'>
                <label>Likes: {value.Likes.length}</label>
              </div>
          </div>
        </div>
      );
    })}
      </div>
    </div>
  )
}

export default Profile
