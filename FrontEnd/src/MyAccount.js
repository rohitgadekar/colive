import { Box } from '@chakra-ui/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { persistor } from "../src/redux/store";
import { clearUser } from './redux/slice/userslice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser, updateUser } from './redux/slice/userslice';
import {
    
    Button,
   
    Heading, Input, 
    useToast, 
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function MyAccount() {
    const state = useSelector((state) => {
        return state.reducer.user
    })
    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']
    const navigate = useNavigate();
    

    var [values, setValues] = useState({
        fname: "",
        lname: "",
    })

    const dispatch = useDispatch()

    const handleInput = (e) => {
        const { name, value } = e.target
        setValues((prev) => {
            return { ...prev, [name]: value }
        })

    }

    const handleClick = () => {
        if (values.fname !== '' && values.lname !== '') {
            console.log(state.users[0])
            console.log(state.users[1])
            console.log(state.users[2])
            fetch("http://localhost:8081/users/", {
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
                <Heading size='sm' fontSize='50px' onClick={() => { navigate('/dashboard')}} style={{cursor:'pointer'}}>
                    COLIVE
                </Heading>
                <ul>
                    <div className="flex items-center gap-4">
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    avatarProps={{
                                        isBordered: false,
                                        src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                    }}
                                    className="transition-transform"

                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="User Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-bold">Signed in as</p>
                                    <p className="font-bold">{state.users[0]}</p>
                                </DropdownItem>
                                <DropdownItem key="My Account" onClick={() => { navigate('/my-account') }}>
                                    My Account
                                </DropdownItem>
                                <DropdownItem key="My Bookings" onClick={() => { navigate("/my-bookings") }}>My Bookings</DropdownItem>
                                <DropdownItem key="Help_and_feedback" onClick={() => { }}>
                                    Help & Feedback
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
                    <div className='myacard'>
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
                    <div className='myacard'>
                        <h1 style={{paddingTop:'2em', paddingBottom:'2em'}}>UPDATE DETAILS</h1>
                        <Input name='fname' type='text' id='fname' onChange={handleInput} style={{marginBottom:'2em', width:'80%', fontSize:'.8em'}} placeholder='First Name' />
                        
                        <Input name='lname' type='text' id='lname' onChange={handleInput} style={{marginBottom:'2em', width:'80%', fontSize:'0.8em'}} placeholder='Last Name' />
                        
                        <Button colorScheme='twitter' onClick={handleClick} style={{marginBottom:'2em'}}>update</Button>
                    </div>
                </div>
            </div>
            {/* <Card style={{marginTop:'3em'}}>
                <Button>bookings</Button>
            </Card> */}

        </Box>


    )
}

export default MyAccount