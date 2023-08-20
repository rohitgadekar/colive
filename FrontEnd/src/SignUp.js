import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    useToast,
} from '@chakra-ui/react'
import { Button } from "@nextui-org/react";
function SignUp() {

    // necessary vars
    const navigate = useNavigate()
    var [values, setValues] = useState({
        fname: "",
        username: "",
        lname: "",
        password: ""
    })

    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']

    //on inputs changed 
    const handleInput = (e) => {
        const { name, value } = e.target
        setValues((prev) => {
            return { ...prev, [name]: value }
        })
        document.getElementById('username').style.outline = 'none'
        document.getElementById('password').style.outline = 'none'
        document.getElementById('fname').style.outline = 'none'
        document.getElementById('lname').style.outline = 'none'
    }

    //on login click
    function handleLogin() {
        navigate('/login')

    }

    //on submit
    function handleSubmit(e) {
        e.preventDefault()
        // eslint-disable-next-line
        var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        // var password = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$"
        if (values.username.match(mailformat)) {
            if (values.username !== '' && values.password !== '') {

                // eslint-disable-next-line
                emailCheck()



            }
            else {

                document.getElementById('password').style.outline = 'red 3px solid'
                document.getElementById('fname').style.outline = 'red 3px solid'
                document.getElementById('lname').style.outline = 'red 3px solid'
            }

        }
        else {

            document.getElementById('username').style.outline = 'red 3px solid'
            document.getElementById('fname').style.outline = 'red 3px solid'
            document.getElementById('lname').style.outline = 'red 3px solid'
            document.getElementById('password').style.outline = 'red 3px solid'
            toast({
                title: `${statuses[2]} invalid credentials `,
                status: statuses[2],
                isClosable: true,
            })
        }

    }


    const emailCheck = async () => {
        // http://localhost:8081/users/

        await axios.get("https://colive-server.vercel.app/users/" + values.username)
            .then(res => {
                let a = res.data;
                if (!a) {
                    // http://localhost:8081/users/

                    fetch("https://colive-server.vercel.app/users/", {
                        method: "POST",
                        body: JSON.stringify({
                            lname: values.lname,
                            fname: values.fname,
                            username: values.username,
                            password: values.password
                        }),
                        headers: { "Content-Type": "application/json" }
                    })
                    .then(()=>{

                        document.getElementById('username').value = ''
                        document.getElementById('password').value = ''
                        document.getElementById('fname').value = ''
                        document.getElementById('lname').value = ''
                        toast({
                            title: `account created`,
                            status: statuses[0],
                            isClosable: true,
                        })
                        
                    })
                    
                }
                else {
                    document.getElementById('username').style.outline = 'red 3px solid'

                    toast({
                        title: `${statuses[2]} email already in use`,
                        status: statuses[2],
                        isClosable: true,
                    })
                }
            })



    }

    useEffect(() => {
        document.title = 'SignUp ✳ Colive'
    }, [])

    return (
        <div className='Login-Signup'>
            <div className='card' style={{margin:'5em'}}>
                <h1 className='header'>
                    SIGNUP
                </h1>
                <div className='myac1' >
                    <div>

                        <div className='input-box'>
                            <label className='input-label'>first name</label>
                            <input  id='fname' autoComplete='off' name='fname' type='text' onChange={handleInput} placeholder='enter first name'></input>
                        </div>

                        <div className='input-box'>
                            <label className='input-label'>last name</label>
                            <input id='lname' autoComplete='off' name='lname' type='text' onChange={handleInput} placeholder='enter last name'></input>
                        </div>

                    </div>
                    <div>

                        <div className='input-box' >
                            <label className='input-label'>email</label>
                            <input id='username' autoComplete='off' name='username' type='email' onChange={handleInput} placeholder='enter email'></input>
                        </div>
                        <div className='input-box' id='child'>
                            <label className='input-label'>password</label>
                            <input id='password' autoComplete='off' name='password' type='password' onChange={handleInput} placeholder='strong password'></input>
                        </div>
                    </div>

                </div>
                <div className='utag'>
                    <label className='utag-label'>already have account ? <u onClick={handleLogin}>login</u></label>
                </div>
                <div>
                    <Button variant='shadow' color='primary' id='submit' onClick={handleSubmit}>
                        SignUp
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SignUp