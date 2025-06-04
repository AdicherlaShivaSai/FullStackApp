import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../helpers/AuthContext'
import './ChangePassword.css';

function ChangePassword() {
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const changePassword = () => {
        axios.put("http://localhost:3001/auth/changepassword", {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert("Password Changed Successfully");
                setOldPassword("");
                setNewPassword("");
                navigate(`/profile/${authState.id}`); // Redirect to profile page after changing password
            }
        }).catch((error) => {
            console.error("There was an error changing the password!", error);
        });
    }
  return (
    <div className='changePasswordContainer'>
      <h1>Change your Password</h1>
      <input type="password" placeholder="Current Password" onChange={(event) =>{
        setOldPassword(event.target.value);
      }}/>
      <input type="password" placeholder="New Password" onChange={(event)=>{
        setNewPassword(event.target.value);
      }}/>
      <button onClick={changePassword}>Save Changes</button>
    </div>
  )
}

export default ChangePassword
