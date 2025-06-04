import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext,} from 'react';
import axios from 'axios';
import './Post.css';
import { AuthContext } from '../helpers/AuthContext';


function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [commentList, setCommentList] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { authState } = useContext(AuthContext); 
    let navigate = useNavigate();

    useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
        setPostObject(response.data);
    })

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
        setCommentList(response.data);
    });

    }, []);

    const addComment = () => {
        axios
        .post('http://localhost:3001/comments', {
            commentBody: newComment,
            PostId: id,
        },
        {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            },
        })
        .then((response) => {
            if (response.data.error) {
                console.log(response.data.error);  
            }
            else{
            const commentToAdd = {commentBody: newComment, username: response.data.username};
            setCommentList([...commentList, commentToAdd]);
            setNewComment('')}         
        })
        .catch((error) => {
            console.error("Failed to post comment:", error);
            alert("Failed to add comment. See console for details.");
        });   
    }

    const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setCommentList(
          commentList.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
  }

  const editPost = (option) => {
    if(option === 'title'){
        let newTitle = prompt("Enter new title:");
        axios.put('http://localhost:3001/posts/title', {
            newTitle: newTitle,
            id: postObject.id,
        }, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            },
        }).then((response) => {
            setPostObject({...postObject, title: response.data});
        });
    }
    else{
        let newPostText = prompt("Enter new post text:");
        axios.put('http://localhost:3001/posts/postText', {
            newText: newPostText,
            id: postObject.id,
        }, {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            },
        }).then((response) => {
            setPostObject({...postObject, postText: response.data});
        });
    }
  }

  return (
    <div className='postPage'>
        <div className="leftSide">
            <div className="post" key={postObject.id}>
                <div 
                    className="title" cursor="pointer"
                    onClick={()=>{
                        if (authState.username === postObject.username) {
                        editPost('title')
                        }}}
                        >
                        {postObject.title}
                </div>
                <div 
                    className="body" cursor="pointer"
                    onClick={()=>{
                        if (authState.username === postObject.username) {
                        editPost('postText')
                        }}}
                        >
                    {postObject.postText}
                </div>
                <div className="footer">
                    {postObject.username}
                    {authState.username === postObject.username && (
                        <button onClick={()=>{
                            deletePost(postObject.id);
                            navigate('/'); // Redirect to home after deletion
                            }}>Delete Post</button>
                    )}
                    </div>
            </div>
        </div>
        <div className="rightSide">
            <div className='addCommentContainer'>
                <input 
                    type="text" 
                    placeholder='Comment...' 
                    autoComplete='off' 
                    value={newComment}
                    onChange={(e)=>
                        {setNewComment(e.target.value)}
                    }
                />
                <button onClick={addComment}>Add Comment</button>
            </div>
            <div className='listOfComments'>
                {commentList.map((comment, key) => {
                    return <div key={key} className='comment'>
                            {comment.commentBody}
                            <label className='commentUsername'>Username: {comment.username}</label>
                            {authState.username === comment.username && 
                                <button 
                                onClick={()=>
                                {deleteComment(comment.id)}}
                                >
                                X
                                </button>}
                            </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default Post
