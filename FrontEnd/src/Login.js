import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";
import {

    Heading,
    useToast
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { addUser } from './redux/slice/userslice';

function Login() {

    // necessary vars
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    var [email] = useState('')
    var [password] = useState('')
    const navigate = useNavigate()
    const [state, setState] = useState(false)
    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']
    const dispatch = useDispatch()


    //on login click
    function handleSignup() {
        navigate('/')
    }

    // input change
    const handleChange = (e) => {
        const username = document.getElementById('username')
        const password = document.getElementById('password')
        const { name, value } = e.target
        setValues((prev) => {
            return { ...prev, [name]: value }
        })
        if (values.username.length > 2) {
            username.style.outline = '#4eb5f1 3px solid'
        }
        if (values.password.length > 2) {
            password.style.outline = '#4eb5f1 3px solid'
        }

    }
    

    // login
    const handleSubmit = (e) => {
        const username = document.getElementById('username')
        const password = document.getElementById('password')
        if (values.username === '' && values.password === '') {
            username.style.outline = 'red 3px solid'
            username.placeholder = 'username required'
            password.placeholder = 'password required'
            password.style.outline = 'red 3px solid'
            toast({
                title: `${statuses[2]} fields empty `,
                status: statuses[2],
                isClosable: true,
            })
        }
        else if (values.username === '') {
            username.style.outline = 'red 3px solid'
            username.placeholder = 'username required'
            toast({
                title: `${statuses[2]} username empty `,
                status: statuses[2],
                isClosable: true,
            })
        }
        else if (values.password === '') {
            password.placeholder = 'password required'
            password.style.outline = 'red 3px solid'
            toast({
                title: `${statuses[2]} password empty `,
                status: statuses[2],
                isClosable: true,
            })

        }
        else if (values.username !== '' && values.password !== '') {
            setState(!state)
            // setTimeout(() => { 
            var fname = ''
            var lname = ''
            // http://localhost:8081/users
            fetch('https://colive-server.vercel.app/users', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    let key = 0;
                    for (let index = 0; index < data.length; index++) {
                        if (values.username === data[index].username && values.password === data[index].password) {
                            console.log(index)
                            fname = data[index].fname
                            lname = data[index].lname
                            key = 1;
                            break;
                        }
                    }
                    if (key === 0) {
                        toast({
                            title: `${statuses[2]} invalid credentials`,
                            status: statuses[2],
                            isClosable: true,
                        })
                        setState(false)
                    }
                    else if (key === 1) {
                        toast({
                            title: `Login ${statuses[0]}`,
                            status: statuses[0],
                            isClosable: true,
                        })
                        dispatch(addUser(values.username))
                        dispatch(addUser(fname))
                        dispatch(addUser(lname))
                        navigate('/dashboard')
                    }
                })

        }

    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const form = useRef();


    // forgot password
    const sendEmail = (e) => {

        // eslint-disable-next-line
        var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (email.match(mailformat)) {
            // http://localhost:8081/users
            fetch('https://colive-server.vercel.app/users', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    let key = 0;
                    for (let index = 0; index < data.length; index++) {
                        if (email === data[index].username) {
                            key = 1
                            break;
                        }
                    }

                    if (key === 1) {

                        if (password !== '') {
                            // http://localhost:8081/users/upwd/
                            fetch("https://colive-server.vercel.app/users/upwd/", {
                                method: "PATCH",
                                body: JSON.stringify({
                                    username: email,
                                    password: password,
                                }),
                                headers: { 'Content-Type': 'application/json' }
                            })
                                .then(res => res.json()).then(data => {
                                    toast({
                                        title: `password changed`,
                                        status: statuses[2],
                                        isClosable: true,
                                    })
                                    
                                })
                                
                        } else {
                            console.log(document.getElementById('password').value)
                            toast({
                                title: `enter password`,
                                status: statuses[1],
                                isClosable: true,
                            })
                        }
                    }
                    else {
                        toast({
                            title: `email not found`,
                            status: statuses[1],
                            isClosable: true,
                        })
                    }
                })




        } else {
            toast({
                title: `invalid email`,
                status: statuses[2],
                isClosable: true,
            })
        }



    };

    useEffect(()=>{
        document.title = 'Login ✳ Colive'
    },[])


    return (
        <div className='Login-Signup'>
            <div className='card'>
                <Heading size='lg' fontSize='50px' className='header'>
                    LOGIN
                </Heading>
                <div className='input-box'>
                    <label className='input-label'>email</label>
                    <input autoComplete='off' id='username' name='username' onChange={handleChange} type='email' placeholder='email'></input>
                </div>
                <div className='input-box'>
                    <label className='input-label'>password</label>
                    <input autoComplete='off' id='password' name='password' onChange={handleChange} type='password' placeholder='strong password'></input>
                </div>
                <div className='utag'>
                    <label className='utag-label'>don't have account ? <u onClick={handleSignup}>signup</u></label>
                </div>
                <div className='utag'>
                    <label className='utag-label'>forgot password ? <u onClick={onOpen}>click here</u></label>
                </div>

                
                <Modal className='res' style={{ color: 'white' }} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Forgot Password</ModalHeader>
                                <ModalBody>
                                    <form ref={form} style={{ display: 'flex', flexDirection: 'column' }} onSubmit={sendEmail}>
                                        <label style={{ paddingBottom: '.8em' }}>Email</label>

                                        <input autoComplete='off' className='forgot' variant='default' name="user_email" placeholder='enter 
                                        email' onChange={(e) => { email = e.target.value; }} />



                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <label style={{ paddingBottom: '.8em' }}>Enter Password</label>
                                            <input autoComplete='off' id='password' className='forgot' type='password' placeholder='enter password' onChange={(e) => { password = e.target.value; }} />
                                        </div>

                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={sendEmail}>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <div>
                    <Button isLoading={state} variant='shadow' color='primary' onClick={handleSubmit}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login