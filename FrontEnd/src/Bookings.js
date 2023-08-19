import { Box } from '@chakra-ui/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import {
    Heading,
} from '@chakra-ui/react'
import properties from './components/properties.json'
import { persistor } from "../src/redux/store";
import { clearUser } from './redux/slice/userslice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Lottie from "lottie-react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Bookings() {
    const [records] = useState([])
    const [reserved] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:8081/users/get/" + state.users[0], {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json()).then(data => {
                for (let i = 0; i < data.reserved.length; i++) {
                    // console.log(data.reserved[i].ref)
                    reserved.push(data.reserved[i].ref)

                }
                for (let i = 0; i < data.scheduled.length; i++) {
                    // console.log(data.reserved[i].ref)
                    records.push(data.scheduled[i].ref)

                }
                // for (let index = 0; index < reserved.length; index++) {
                //     console.log(reserved[index])

                // }
                console.log(records.length)
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const state = useSelector((state) => {
        return state.reducer.user
    })
    const navigate = useNavigate();


    const handleCancel = (e) => {
        console.log(e)
        fetch("http://localhost:8081/users/del/", {
            method: "PATCH",
            body: JSON.stringify({
                username: state.users[0],
                ref: e
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                window.location.reload()
            })
    }

    const dispatch = useDispatch()





    if (!loading && (records.length !== 0 || reserved.length !== 0))
        return (
            <Box className='dash' style={{ paddingBottom: '5em' }}>
                {/* header */}
                <nav className='dash-nav'>
                    <Heading size='sm' fontSize='50px' onClick={() => { navigate('/dashboard') }} style={{ cursor: 'pointer' }}>
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
                                            src: "https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692350523/project/h2h5ypdgs0pvyqnqgyem.png",
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
                                    <DropdownItem key="My Bookings" onClick={() => { }}>My Bookings</DropdownItem>
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


                <div className='myac' >
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: "2em", justifyContent: 'center' }}>


                        {records.map((item, index) => {
                            return <Card Card className="booking" key={index}>
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-xl font-semibold leading-none text-white-600">SCHEDULED</h4>
                                            <h5 className="text-small tracking-tight text-white-400">{records[index][7]}</h5>
                                        </div>
                                    </div>
                                    <Button
                                        className=""
                                        color="warning"
                                        radius="full"
                                        size="md"
                                        variant="ghost"
                                        onPress={() => { handleCancel(item[7]) }}
                                    >
                                        cancel booking
                                    </Button>
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <Image src={records[index][10]} style={{ width: '500px' }}></Image>
                                    <p style={{ paddingTop: '1em', color: 'white', fontSize: '2em' }}>
                                        {records[index][8]}
                                    </p>
                                    <p style={{ paddingTop: '1em', color: 'white', fontSize: '1.2em' }}>
                                        {records[index][9]}
                                    </p>
                                    <span className="pt-2" style={{ color: 'white' }}>
                                        CITY
                                    </span>
                                </CardBody>
                                <CardFooter className="gap-3">
                                    <div className="flex gap-1 text-white-400">
                                        <p className=" text-white-400 text-small">{records[index][4]}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-white-400 text-small"></p>
                                        <p className="text-white-400 text-small">{records[index][11]}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        })}


                        {reserved.map((item, index) => {
                            return <Card Card className="booking" key={index}>
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-xl font-semibold leading-none text-white-600">RESERVED</h4>
                                            <h5 className="text-sm tracking-tight text-white-400">{reserved[index][7]}</h5>
                                        </div>
                                    </div>
                                    <Button
                                        className=""
                                        color="warning"
                                        radius="full"
                                        size="md"
                                        variant="ghost"
                                        onPress={() => { console.log(item[7]) }}
                                    >
                                        cancel booking
                                    </Button>
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <Image src={reserved[index][10]} style={{ width: '500px' }}></Image>
                                    <p style={{ paddingTop: '1em', color: 'white', fontSize: '2em' }}>
                                        {reserved[index][8]}
                                    </p>
                                    <p style={{ paddingTop: '1em', color: 'white', fontSize: '1.2em' }}>
                                        {reserved[index][9]}
                                    </p>
                                    <span className="pt-2" style={{ color: 'white' }}>
                                        CITY
                                    </span>
                                </CardBody>
                                <CardFooter className="gap-3">
                                    <div className="flex gap-1 text-white-400">
                                        <p className=" text-white-400 text-small">{reserved[index][4]}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-white-400 text-small"></p>
                                        <p className="text-white-400 text-small">{reserved[index][11]}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        })}




                    </div>
                </div>
                {/* <Card style={{marginTop:'3em'}}>
                <Button>bookings</Button>
            </Card> */}

            </Box>
        )
    else if(!loading) {
        return (
            <Box className='dash' style={{ paddingBottom: '5em' }}>
                {/* header */}
                <nav className='dash-nav'>
                    <Heading size='sm' fontSize='50px' onClick={() => { navigate('/dashboard') }} style={{ cursor: 'pointer' }}>
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
                                            src: "https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692351137/project/icons8-user-64_n8vefz.png",
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
                                    <DropdownItem key="My Bookings" onClick={() => { }}>My Bookings</DropdownItem>
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

                <div  className='booking mt-20' style={{justifyContent:'center'}}>
                    <Lottie style={{width:'300px'}}  animationData={properties}></Lottie>
                    <h1 style={{ marginTop: '2em' }}>OOPS</h1>
                    <h2 style={{marginBottom:'2em'}}>YOU DONT HAVE ANY BOOKINGS</h2>
                    <Button className='' variant='ghost' color='warning' onPress={()=>{navigate('/dashboard')}}>search properties</Button>
                </div>

            </Box>
        )
    }
}

export default Bookings