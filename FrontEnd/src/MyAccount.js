import { Box } from '@chakra-ui/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { persistor } from "../src/redux/store";
import { clearUser } from './redux/slice/userslice';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser, updateUser } from './redux/slice/userslice';
import {
    
    Button,
    Input, 
    useToast, 
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function MyAccount() {
    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // get user from redux store
    const state = useSelector((state) => {
        return state.reducer.user
    })
    
    var [values, setValues] = useState({
        fname: "",
        lname: "",
    })

    // document title
    useEffect(()=>{
        document.title = 'My Account ✳ Colive'
    },[])

    
    // input changes
    const handleInput = (e) => {
        const { name, value } = e.target
        setValues((prev) => {
            return { ...prev, [name]: value }
        })

    }

    // update details
    const handleClick = () => {
        if (values.fname !== '' && values.lname !== '') {
            console.log(state.users[0])
            console.log(state.users[1])
            console.log(state.users[2])
            // http://localhost:8081/users/
            fetch("https://colive-server.vercel.app/users/", {
                method: "PATCH",
                body: JSON.stringify({
                    username: state.users[0],
                    fname: values.fname,
                    lname: values.lname
                }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json()).then(data => {
                    console.log(data)
                    dispatch(updateUser())
                    dispatch(addUser(values.fname))
                    dispatch(addUser(values.lname))
                    toast({
                        title: `update ${statuses[0]}`,
                        status: statuses[0],
                        isClosable: true,
                    })
                    document.getElementById('fname').value = ''
                    document.getElementById('lname').value = ''
                })
        }
    }

    return (
        <Box className='dash' style={{paddingBottom:'5em'}}>
            {/* header */}
            <nav className='dash-nav'>
                <h1 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl" onClick={() => { navigate('/dashboard') }} style={{ cursor: 'pointer' }}><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">COLIVE</span></h1>
                <ul>
                    <div className="flex items-center gap-4">
                        <Dropdown placement="bottom-start" style={{ fontFamily: 'Aileron-Regular' }}>
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    avatarProps={{
                                        isBordered: false,
                                        src: "https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692431948/project/3105265_1_wnwylr.png",
                                    }}
                                    className="transition-transform"

                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" variant="flat" style={{ fontFamily: 'Aileron-Regular' }}>
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-bold">Signed in as</p>
                                    <p className="font-bold">{state.users[0]}</p>
                                </DropdownItem>
                                <DropdownItem key="My Account" onClick={() => { navigate('/my-account') }}>
                                    My Account
                                </DropdownItem>
                                <DropdownItem key="My Bookings" onClick={() => { navigate("/my-bookings") }}>My Bookings</DropdownItem>
                                <DropdownItem key="Help_and_feedback" onClick={() => { navigate('/faq') }}>
                                    Faqs
                                </DropdownItem>
                                <DropdownItem onAction={() => { dispatch(clearUser); persistor.purge(); localStorage.clear(); window.location.replace('/login') }} key="Log Out" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                </ul>
            </nav>


            <div   className='myac'>
                <div >
                    <div className='myacard' style={{ fontFamily: 'Aileron-Regular' }}>
                        <h1 style={{paddingTop:'2em'}}>
                            PROFILE
                        </h1>
                        <hr style={{ marginTop: '1em', marginBottom: '1em', width: '70%' }}></hr>
                        <h2>FIRST NAME</h2>
                        <h3>{state.users[1]}</h3>
                        <hr style={{ marginTop: '1em', marginBottom: '1em', width:'20%' }}></hr>
                        <h2>LAST NAME</h2>
                        <h3>{state.users[2]}</h3>
                        <hr style={{ marginTop: '1em', marginBottom: '1em', width: '20%' }}></hr>
                        <h2>EMAIL</h2>
                        <h3 style={{ paddingBottom: '2em' }}> {state.users[0]}</h3>
                    </div>
                </div>
                <div>
                    <div className='myacard' style={{ fontFamily: 'Aileron-Regular' }}>
                        <h1 style={{paddingTop:'2em', paddingBottom:'2em'}}>UPDATE DETAILS</h1>
                        <Input name='fname' type='text' id='fname' onChange={handleInput} style={{marginBottom:'2em', width:'80%', fontSize:'.8em'}} placeholder='First Name' />
                        
                        <Input name='lname' type='text' id='lname' onChange={handleInput} style={{marginBottom:'2em', width:'80%', fontSize:'0.8em'}} placeholder='Last Name' />
                        
                        <Button  colorScheme='twitter' onClick={handleClick} style={{marginBottom:'2em'}}>update</Button>
                    </div>
                </div>
            </div>

        </Box>


    )
}

export default MyAccount