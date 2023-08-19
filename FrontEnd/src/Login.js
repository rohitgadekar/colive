import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Input } from "@nextui-org/react";
import emailjs from '@emailjs/browser';
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
    const navigate = useNavigate()
    const [state, setState] = useState(false)
    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']
    
  
    
    const handleC = () => {
        
    }

    //on login click
    function handleSignup() {
        navigate('/')
    }

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

    // diap
    const dispatch = useDispatch()

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
            fetch('http://localhost:8081/users', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
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

            //  },1000)

        }

    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_yk539x9', 'template_tl0hy1s', form.current, 'k0THbH4U1mHE2wrQm')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };


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
                    <label className='utag-label'>forgot password ? <u onClick={handleSignup}>click here</u></label>
                </div>
                
                <Button onPress={onOpen}>Open Modal</Button>
                <Modal className='res' style={{color:'white'}} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Forgot Password</ModalHeader>
                                <ModalBody>
                                    <form ref={form} style={{display:'flex', flexDirection:'column'}} onSubmit={sendEmail}>
                                        <label>Email</label>
                                        <Input  variant='default' name="user_email" />
                                        
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={sendEmail}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <div>
                    <Button isLoading={state} size='md' colorScheme='twitter' variant='solid' onClick={handleC}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login