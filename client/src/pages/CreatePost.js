import {Formik, Form, Field, ErrorMessage} from 'formik';
import './CreatePost.css';
import * as Yup from 'yup'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    }, []);

  return (
    <div className="createPostPage">
        <Formik
            initialValues={{ title: '', postText: '', username: '' }}
            validationSchema= {Yup.object().shape({
                title: Yup.string().min(5).max(30).required('Title is required'),
                postText: Yup.string().min(10).max(100).required('Post text is required'),
                
            })}
            onSubmit={(values, { setSubmitting }) => {
            // Handle form submission logic here

            axios.post('https://fullstackapp-y9y6.onrender.com/posts', values, {
                headers: {accessToken: localStorage.getItem("accessToken")}})
                .then((response) => {
                // setListOfPosts(response.values);
                navigate('/'); // Redirect to home page after successful post creation
            });
            setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
            <Form className='createPostForm'>
                <label>Title: </label>
                <Field 
                    autocomplete="off"
                    // type="text" 
                    name="title" 
                    placeholder="Title"
                   
                />
                <ErrorMessage name="title" component="div" className='error'/><br />
                <label>Post Text: </label>
                <Field 
                    autocomplete="off" 
                    // as="textarea" 
                    name="postText" 
                    placeholder="Post Text" 
                    
                />
                <ErrorMessage name="postText" component="div" className='error'/><br />
                <button 
                    type="submit" 
                    disabled={isSubmitting}>
                Create Post
                </button>
            </Form>
            )}
        </Formik>
    </div>
  )
}

export default CreatePost
