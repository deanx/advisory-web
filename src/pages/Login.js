import React, { useState } from 'react';

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  Box,
  Center
} from '@chakra-ui/react';

import { useGoogleLogin } from '@react-oauth/google';

import { Icon } from '@chakra-ui/react'




function Login(props) {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse.access_token)
      setUser(codeResponse)
      authenticateGoogleUser(codeResponse.access_token)
    }
    ,
    onError: (error) => console.log('Login Failed:', error)
  });

  const authenticateGoogleUser = async (accessToken) => {
    const URL = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
    try {
      const response = await axios.get(URL);
      props.setProfile(response.data);
      console.log(response.data)
    } catch (error) {
      console.log("google auth error: ", error)
    }
  }

  const [user, setUser] = useState([]);

  return (
 
<Box w='100%' p={4} color='DodgerBlue'>
<Center>
<div onClick={login} className="google-login btn">
<FontAwesomeIcon icon={faGoogle} className='login-icon' />Login with Google+
  </div>
</Center>
</Box>


  )
}

export default Login;