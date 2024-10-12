import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { loginStart,loginSuccess,loginFail } from "../utils/userSlice";
import { useNavigate } from "react-router";

export default function Login() {
    const [login, setLogin] = useState({username:'',password:''});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setLogin({...login,[e.target.name]:e.target.value})
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const res = await fetch('https://vercel-backend-blue.vercel.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
                credentials:'include',
            });
            const data = await res.json();
            console.log(data);
            if (!res.ok)
                alert('Invalid user or wrong Credentials');
            else{dispatch(loginSuccess(data));
            navigate('/');}
            
            
        }
        catch (err)
        {
            dispatch(loginFail());
        }

        
        
    }
    return (
        <>
            <Box maxWidth="400px" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
                <form onSubmit={handleSubmit}>
                
                    <Stack>
                        <FormLabel htmlFor="">Username</FormLabel><Input name="username" type="text" onChange={handleChange} value={login.username} />
                        <FormLabel htmlFor="">Password</FormLabel><Input type="password" onChange={handleChange} name="password" value={login.password} />
                        <Button type="submit" colorScheme="teal">LogIn</Button>
                    </Stack>
                </form>
            </Box>
        </>
    )
}