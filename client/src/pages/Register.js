import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import your CSS file for styling

function Register() {
    let navigate = useNavigate();
  return (
    <div>
        <h1>Register</h1>
        <p>Please fill in the form below to create an account.</p>
        <Formik
            initialValues={{ username: '',password:''  }}
            validationSchema= {Yup.object().shape({
                username: Yup.string().min(5).max(20).required('Username is required'),
                password: Yup.string().min(5).max(20).required('Password is required')
            })}
            onSubmit={(data, { setSubmitting }) => {
            // Handle form submission logic here
            axios.post('https://fullstackapp-y9y6.onrender.com/auth', data).then((response) => {
                console.log(response.data);
                navigate('/'); // Redirect to home page after successful post creation
            });
            setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
            <Form className='registerForm'>
                <label>Username: </label>
                <Field 
                    autocomplete="off" 
                    type="text" 
                    name="username" 
                    placeholder="Username"
                />
                <ErrorMessage name="username" component="div" className='error'/><br />
                <label>Password: </label>
                <Field 
                    autocomplete="off" 
                    type="password" 
                    name="password" 
                    placeholder="Password"/>
                <ErrorMessage name="password" component="div" className='error'/><br />
                <button 
                    type="submit" 
                    disabled={isSubmitting}>
                    Register
                </button>
            </Form>
            )}
        </Formik>
    </div>
  )
}

export default Register
