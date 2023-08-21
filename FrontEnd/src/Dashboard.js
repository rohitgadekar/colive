import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { Chip } from "@nextui-org/react";

import { clearUser } from './redux/slice/userslice';
import { Container, Input,
    useToast, Center, Box, Image,
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { useSelector } from 'react-redux'
import { persistor } from "../src/redux/store";
import { useDispatch } from 'react-redux'

function Dashboard() {
    // var
    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']
    const navigate = useNavigate();
    const [data, sendData] = useState([])
    const [records, setRecords] = useState([])
    const [prop, SetProp] = useState('');
    const [isLoading, setLoading] = useState(true);

    // fetch properties from db
    useEffect(() => {
        document.title = 'Home ✳ Colive'
        axios.get('https://api.jsonbin.io/v3/b/64854f43b89b1e2299ad1fa1')
            .then(res => {
                SetProp(res.data.record.prop)
                setRecords(res.data.record.prop)
                sendData(res.data.record.prop)
                setLoading(false)
            })
    }, [])

    // handle search query
    const handleQuery = (e) => {
        document.getElementById('res').style.display = 'hidden'
        setRecords(records.filter(f => f.title.toLowerCase().includes(e.target.value.toLowerCase())))
        document.getElementById('cards').display = 'none';
        if (e.target.value === '' || records.length <= 1) {
            document.getElementById('res').style.display = 'none'

        }
        else {
            document.getElementById('res').style.display = 'block'
        }
    }

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["All Cities"]));

    // filter cities
    const handleChange = (key) => {
        if (key === "All Cities")
            setRecords(data)
        else if (key === 'Mumbai')
            setRecords(data.filter(f => f.City.includes("Mumbai")))
        else if (key === 'Punjab')
            setRecords(data.filter(f => f.City.includes("Punjab")))
        else if (key === 'Chennai')
            setRecords(data.filter(f => f.City.includes("Chennai")))
        else if (key === 'Noida')
            setRecords(data.filter(f => f.City.includes("Noida")))
        else if (key === 'Delhi')
            setRecords(data.filter(f => f.City.includes("Delhi")))
        else if (key === 'Bangalore')
            setRecords(data.filter(f => f.City.includes("Bangalore")))
        else if (key === 'Pune')
            setRecords(data.filter(f => f.City.includes("Pune")))
        else if (key === 'Hyderabad')
            setRecords(data.filter(f => f.City.includes("Hyderabad")))
        else if (key === 'Goa')
            setRecords(data.filter(f => f.City.includes("Goa")))
        else if (key === 'Kolkata')
            setRecords(data.filter(f => f.City.includes("Kolkata")))
    }

    // dropdown memo
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    // handle card onclick
    const handleCard = (e) => {
        toast({
            title: `${prop[e.target.id - 1].title}`,
            status: statuses[0],
            isClosable: true,
        })

        localStorage.setItem('s', [e.target.id - 1])
        navigate('/property')
        window.scrollTo(0, 0)
    }


    const state = useSelector((state) => {
        return state.reducer.user
    })
    const dispatch = useDispatch()


    // handle search
    const handleSearch = (e) => {
        document.getElementById('res').style.display = 'none'
        console.log(e.target.innerHTML)
        setRecords(data.filter(f => f.title.toLowerCase().includes(e.target.innerHTML.toLowerCase())))
        console.log(records.length)
    }

   
    return (
        <>
            {isLoading ? <ReactLoading></ReactLoading> :
                <Box className='dash'>
                    {/* header */}
                    <nav className='dash-nav'>
                        
                        <h1 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl" onClick={() => { navigate('/dashboard') }} style={{ cursor: 'pointer', fontFamily:'Adam-Bold'}}><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">COLIVE</span></h1>

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
                                    <DropdownMenu aria-label="User Actions" variant="flat" style={{ fontFamily:'Aileron-Regular'}}>
                                        <DropdownItem key="profile" className="h-14 gap-2">
                                            <p className="font-bold">Signed in as</p>
                                            <p className="font-bold">{state.users[0]}</p>
                                        </DropdownItem>
                                        <DropdownItem key="My Account" onClick={() => { navigate('/my-account') }}>
                                            My Account
                                        </DropdownItem>
                                        <DropdownItem key="My Bookings" onClick={() => { navigate('/my-bookings') }}>My Bookings</DropdownItem>
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

                    {/* search box */}
                    <div className='search'>
                        <Center className='search-container' borderRadius={'1em'} padding={'4'} width={'100%'} gap={'1em'} marginBottom={'1em'}>

                            <Dropdown >
                                <DropdownTrigger>
                                    <Button
                                        className='text-white-100 capitalize w-full'
                                        id='xsx'
                                        variant="bordered"
                                        style={{ fontFamily: 'Aileron-Regular' }}
                                    >
                                        {selectedValue}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection actions"
                                    variant="flat"
                                    onAction={(key) => { handleChange(key) }}
                                    style={{ color: "white", fontFamily: 'Aileron-Regular' }}
                                    closeOnSelect={true}
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={setSelectedKeys}
                                    
                                >
                                    <DropdownItem key="All Cities">All Cities</DropdownItem>
                                    <DropdownItem key="Mumbai">Mumbai</DropdownItem>
                                    <DropdownItem key="Chennai">Chennai</DropdownItem>
                                    <DropdownItem key="Punjab">Punjab</DropdownItem>
                                    <DropdownItem key="Delhi">Delhi</DropdownItem>
                                    <DropdownItem key="Bangalore">Banglore</DropdownItem>
                                    <DropdownItem key="Noida">Noida</DropdownItem>
                                    <DropdownItem key="Pune">Pune</DropdownItem>
                                    <DropdownItem key="Hyderabad">Hyderabad</DropdownItem>
                                    <DropdownItem key="Goa">Goa</DropdownItem>
                                    <DropdownItem key="Kolkata">Kolkata</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>


                            <Input style={{ fontFamily:'Aileron-Regular'}} variant='search' autoComplete='off' color={'white'} className='search-container' id='ips' placeholder='search' onChange={handleQuery} />


                            <Button style={{ fontFamily: 'Aileron-Regular' }} variant='solid' color='primary' onPress={() => { document.getElementById('ips').value = ''; document.getElementById('res').style.display = 'none'; handleChange(selectedValue) }} className='chip'>clear</Button>
                        </Center>

                        {/* dynamic results box */}
                        <Container bg={'white'} width={'100%'} color={'white'} borderRadius={'.8em'} padding={'5'} textAlign={'left'} className='res' id='res' display={'none'}>
                            <ul className='query'>
                                {records.map((d, id) => {
                                    return <div key={id} style={{ fontFamily:'Aileron-Regular'}} className='query-box' onClick={handleSearch}>{d.title}</div>
                                })}

                            </ul>
                        </Container>
                    </div>

                    {/* dynamic cards of properties */}
                    <div className='cards' id='cards' >
                        {records.map((d, id) => {
                            return <div key={id}>

                                <Box maxW='sm' borderWidth='2px' borderRadius='lg' overflow='hidden' className='prop'>

                                    {/* image */}
                                    <Image onClick={handleCard} id={d.id} src={d.imageUrl} alt={d.imageAlt} className='ToggleCard img' />

                                    <Box p='2' >
                                        {/* badge */}
                                        <Box display='flex' alignItems='baseline'>
                                            <Chip color="danger" variant="solid" className='chip text-white-800' style={{ fontFamily: 'Aileron-Regular' }}>New</Chip>
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            {/* beds */}
                                            <Chip style={{ fontFamily: 'Aileron-Regular' }} color="danger" variant="solid" className='chip text-white-800'>{d.beds} beds &bull; {d.baths} baths</Chip>

                                        </Box>

                                        {/* property title */}
                                        <Box

                                            style={{ fontFamily: 'Aileron-Regular' }}
                                            textAlign={'left'}
                                            mt='2'
                                            fontWeight='bold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={1}
                                            onClick={handleCard} id={d.id}
                                            className='ToggleCard'
                                            
                                        >
                                            {d.title}
                                        </Box>

                                        {/* property price */}
                                        <Box textAlign={'left'}>
                                            {d.formattedPrice}
                                            <Box as='span' color='white' fontSize='sm' style={{ fontFamily: 'Aileron-Regular' }} >
                                                / wk
                                            </Box>
                                        </Box>

                                        <Box
                                            style={{ fontFamily: 'Aileron-Regular' }}
                                            textAlign={'left'} fontSize={'md'}
                                        >
                                            {d.City} • {d.Area}
                                        </Box>

                                        {/* rating */}
                                        <Box display='flex' mt='0' alignItems='center' style={{ fontFamily: 'Aileron-Regular' }}>
                                            {Array(5)
                                                .fill('')
                                                .map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        color={i < d.rating ? 'yellow.400' : 'gray.300'}
                                                    />
                                                ))}
                                            {/* reviews */}
                                            <Box as='span' ml='2' color='white' fontSize='md' style={{ fontFamily: 'Aileron-Regular' }}>
                                                {d.reviewCount} reviews
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                            </div>

                        })}

                    </div>


                </Box>

            }

        </>
    )
}

export default Dashboard