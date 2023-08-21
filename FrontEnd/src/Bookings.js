import { Box } from '@chakra-ui/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import properties from './components/properties.json'
import { persistor } from "../src/redux/store";
import { clearUser } from './redux/slice/userslice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Lottie from "lottie-react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Bookings() {




    const navigate = useNavigate();
    const [records] = useState([])
    const [reserved] = useState([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    
    // document title && get bookings
    useEffect(() => {
        document.title = 'My Bookings ✳ Colive'
        // http://localhost:8081/users/get/
        fetch("https://colive-server.vercel.app/users/get/" + state.users[0], {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json()).then(data => {
                for (let i = 0; i < data.reserved.length; i++) {
                    reserved.push(data.reserved[i].ref)

                }
                for (let i = 0; i < data.scheduled.length; i++) {
                    records.push(data.scheduled[i].ref)

                }
                console.log(records.length)
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const state = useSelector((state) => {
        return state.reducer.user
    })


    // cancel properties scheduled to visit
    const handleCancelScheduled = (e) => {
        console.log(e)
        // http://localhost:8081/users/del/
        fetch("https://colive-server.vercel.app/users/del/sc/", {
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

    // cancel reserved properties
    const handleCancelReserved = (e) => {
        console.log(e)
        // http://localhost:8081/users/del/
        fetch("https://colive-server.vercel.app/users/del/rs/", {
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

    
    if (!loading && (records.length !== 0 || reserved.length !== 0))
        return (
            <Box className='dash' style={{ paddingBottom: '5em' }}>
                {/* header */}
                <nav className='dash-nav'>
                    <h1  className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl" onClick={() => { navigate('/dashboard') }} style={{ cursor: 'pointer' }}><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">COLIVE</span></h1>
                    <ul>
                        <div className="flex items-center gap-4">
                            <Dropdown placement="bottom-start">
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
                                <DropdownMenu aria-label="User Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-bold">Signed in as</p>
                                        <p className="font-bold">{state.users[0]}</p>
                                    </DropdownItem>
                                    <DropdownItem key="My Account" onClick={() => { navigate('/my-account') }}>
                                        My Account
                                    </DropdownItem>
                                    <DropdownItem key="My Bookings" onClick={() => { }}>My Bookings</DropdownItem>
                                    <DropdownItem key="Faqs" onClick={() => { navigate('/faq') }}>
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


                <div className='myac' style={{ fontFamily: 'Aileron-Regular' }}>
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
                                        onPress={() => { handleCancelScheduled(item[7]) }}
                                    >
                                        cancel booking
                                    </Button>
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <Image src={records[index][10]} style={{ width: '600px' }}></Image>
                                    <p style={{ paddingTop: '1em', color: 'white', fontSize: '2em' }}>
                                        {records[index][8]}
                                    </p>
                                    <p style={{ paddingTop: '1em', color: 'white', fontSize: '1.2em' }}>
                                        {records[index][9]}
                                    </p>
                                    <span className="pt-2" style={{ color: 'white' }}>
                                        {records[index][12]} • {records[index][13]}
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
                                        onPress={() => { handleCancelReserved(item[7]) }}
                                    >
                                        cancel booking
                                    </Button>
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <Image src={reserved[index][10]} style={{ width: '600px' }}></Image>
                                    <p style={{ paddingTop: '1em', color: 'white', fontSize: '2em' }}>
                                        {reserved[index][8]}
                                    </p>
                                    <p style={{ paddingTop: '1em', color: 'white', fontSize: '1.2em' }}>
                                        {reserved[index][9]}
                                    </p>
                                    <span className="pt-2" style={{ color: 'white' }}>
                                        {reserved[index][12]} • {reserved[index][13]}
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
                    <h1 class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl" onClick={() => { navigate('/dashboard') }} style={{ cursor: 'pointer' }}><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">COLIVE</span></h1>
                    <ul>
                        <div className="flex items-center gap-4">
                            <Dropdown placement="bottom-start">
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
                                <DropdownMenu aria-label="User Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-bold">Signed in as</p>
                                        <p className="font-bold">{state.users[0]}</p>
                                    </DropdownItem>
                                    <DropdownItem key="My Account" onClick={() => { navigate('/my-account') }}>
                                        My Account
                                    </DropdownItem>
                                    <DropdownItem key="My Bookings" onClick={() => { }}>My Bookings</DropdownItem>
                                    <DropdownItem key="Faqs" onClick={() => { navigate('/faq') }}>
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