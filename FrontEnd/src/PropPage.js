import {
    Stack, AspectRatio, TabPanel, TabPanels, Tab, TabList, Tabs, Text,  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Card, CardBody, Image, HStack, Box, List, SimpleGrid, Container,StackDivider, useToast
} from '@chakra-ui/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, User, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import Lottie from "lottie-react";
import sucess from './components/sucess.json'
import React from "react";
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { ChevronRightIcon } from '@chakra-ui/icons'


function PropPage() {
    // set document title to property name
    useEffect(()=>{
        document.title = state.reducer.property.data.record.prop[s].title
        // eslint-disable-next-line
    },[])
    const state = useSelector((state) => state)
    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']
    const s = localStorage.getItem('s')
    const navigate = useNavigate();

    var [values] = useState({
        username: state.reducer.user.users[0],
        fname: "",
        lname: "",
        gender: "",
        iam: "",
        date: "",
        number: ""
    })

    const [gender, setGender] = React.useState(new Set(["Gender"]));
    const [iam, setIam] = React.useState(new Set(["I Am"]));

    // gender dropdown
    const genderText = React.useMemo(
        () => Array.from(gender).join(", ").replaceAll("_", " "),
        [gender]
    );
    // profession dropdown
    const iamText = React.useMemo(
        () => Array.from(iam).join(", ").replaceAll("_", " "),
        [iam]
    );

    


    // breadcrumbs
    const handleBreadcrumb = (e) => {
        if (e.target.innerHTML === "Home")
            navigate('/dashboard')
        else
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
    }

    // schedule visit to property
    const handleSchedule = () => {
        if(values.fname !== '' && values.lname !== '' && values.date !== '' && genderText !== '' && iamText !== '' && values.number !== '') {
        let unq = Math.floor(new Date().valueOf() * Math.random())
        localStorage.setItem('ref', unq)
            // http://localhost:8081/users/scheduled/
            fetch("https://colive-server.vercel.app/users/scheduled/", {
            method: "PATCH",
            body: JSON.stringify({
                username: state.reducer.user.users[0],
                fname: values.fname,
                lname: values.lname,
                phone: values.number,
                date: values.date.slice(0, 10),
                gender: genderText,
                profession: iamText,
                property: state.reducer.property.data.record.prop[s].title,
                listedPrice: state.reducer.property.data.record.prop[s].formattedPrice,
                src: state.reducer.property.data.record.prop[s].imageUrl,
                ref: unq,
                time: values.date.slice(11),
                city: state.reducer.property.data.record.prop[s].City,
                area: state.reducer.property.data.record.prop[s].Area
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json()).then(data => {
                console.log(data)
                setSucessState("Visit Scheduled")
                onOpen()
            })
        }
        else {
            toast({
                title: `fields empty `,
                status: statuses[3],
                isClosable: true,
            })
        }
    }

    // reserve property
    const handleReserve = () => {
        if (values.fname !== '' && values.lname !== '' && values.date !== '' && genderText !== '' && iamText !== '' && values.number !== '') {

        let unq = Math.floor(new Date().valueOf() * Math.random())
            // http://localhost:8081/users/reserved/
            fetch("https://colive-server.vercel.app/users/reserved/", {
            method: "PATCH",
            body: JSON.stringify({
                username: state.reducer.user.users[0],
                fname: values.fname,
                lname: values.lname,
                phone: values.number,
                date: values.date.slice(0, 10),
                gender: genderText,
                profession: iamText,
                property: state.reducer.property.data.record.prop[s].title,
                listedPrice: state.reducer.property.data.record.prop[s].formattedPrice,
                src: state.reducer.property.data.record.prop[s].imageUrl,
                ref: unq,
                time: values.date.slice(11),
                city: state.reducer.property.data.record.prop[s].City,
                area: state.reducer.property.data.record.prop[s].Area
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json()).then(data => {
                console.log(data)
                setSucessState("Property Reserved")
                onOpen()
            })

        }
        else {
            toast({
                title: `fields empty `,
                status: statuses[3],
                isClosable: true,
            })
        }
    }

    // modal states
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ successState, setSucessState] = useState('')

   

    if (!state.reducer.property.isLoading)
        return (
            <Box className='dash'>
                {/* header start */}
                <nav className='dash-nav'>
                    <h1 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl" onClick={() => { navigate('/dashboard') }} style={{ cursor: 'pointer' }}><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">COLIVE</span></h1>
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
                                        <p className="font-bold">{state.reducer.user.users[0]}</p>
                                    </DropdownItem>
                                    <DropdownItem key="My Account" onAction={() => { navigate('/my-account') }}>
                                        My Account
                                    </DropdownItem>
                                    <DropdownItem key="My Bookings" onAction={() => { navigate('/my-bookings') }}>My Bookings</DropdownItem>
                                    <DropdownItem key="Help_and_feedback" onClick={() => { navigate('/faq') }}>
                                        Faqs
                                    </DropdownItem>
                                    <DropdownItem onAction={() => { navigate('/login') }} key="Log Out" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                    </ul>
                </nav>
                {/* header end */}

                {/* property card */}
                <Container maxW={'full'} style={{ fontFamily: 'Aileron-Regular' }}>
                    <SimpleGrid

                        columns={{ base: 1, lg: 2 }}
                        spacing={{ base: 8, md: 10 }}
                        py={{ base: 18, md: 15 }}>

                        {/* image carousal */}
                        <Stack spacing={{ base: 6, md: 10 }}>
                            <Stack direction="row" alignItems="center" justifyContent={'center'}>
                                <Image
                                    height={'1xl'}
                                    width={'6xl'}
                                    objectFit='cover'
                                    src={state.reducer.property.data.record.prop[s].imageUrl}
                                    alt=''
                                    borderRadius={'xl'}
                                />

                            </Stack>


                            {/* price && title end */}
                            <Box as={'header'}>
                                <Heading
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    color={'white'}
                                    fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                    {state.reducer.property.data.record.prop[s].title}
                                </Heading>
                                
                                <Text
                                    color={'white'}
                                    fontWeight={400}
                                    fontSize={'2xl'}>
                                    {state.reducer.property.data.record.prop[s].formattedPrice} 
                                </Text>
                                <Text
                                    color={'white'}
                                    fontWeight={400}
                                    fontSize={'2xl'}>
                                    {state.reducer.property.data.record.prop[s].Area}  • {state.reducer.property.data.record.prop[s].City}
                                </Text>
                            </Box>
                            {/* price && title end */}

                            <Stack
                                spacing={{ base: 4, sm: 6 }}
                                direction={'column'}
                                divider={
                                    <StackDivider
                                        borderColor={'lightgrey'}
                                    />
                                }>

                                {/* desc start */}
                                <Text
                                    color={'white'}
                                    fontSize={'1xl'} width={'90%'} paddingLeft={'10%'}>
                                    Nice and spacious room in the heart of Valencia, with double bed and a balcony. Silent because there is no traffic. Surrounded by all the landmarks , museums , cathedral , leisure, and close to the beach where you can go by bike, bus , tram or car if your means of transportation.
                                </Text>
                                {/* desc end */}

                                {/* amenities start */}
                                <Stack direction="row" alignItems="center" justifyContent={'center'}>
                                    <Box>
                                        <Text
                                            fontSize={{ base: '20px', lg: '18px' }}
                                            color={'white'}
                                            fontWeight={'1000'}
                                            textTransform={'uppercase'}
                                            mb={'4'}>
                                            Amenities
                                        </Text>

                                        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
                                            <List spacing={0}>
                                                
                                                <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>Travel Cot
                                                </Chip>
                                                <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>Private patio or balcony
                                                </Chip>
                                                <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>WIFI
                                                </Chip>
                                                <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>Refrigerator
                                                </Chip>
                                                <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>Microwave
                                                </Chip>
                                                <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>Oven
                                                </Chip>
                                                <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>Coffee maker
                                                </Chip>
                                                <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>Dishes and silverware
                                                </Chip>
                                                
                                            </List>
                                        </SimpleGrid>
                                    </Box>
                                </Stack>
                                {/* amenities end */}


                                {/* things to know start */}
                                <Box>
                                    <Text
                                        fontSize={{ base: '20px', lg: '18px' }}
                                        color={'white'}
                                        fontWeight={'1000'}
                                        textTransform={'uppercase'}
                                        mb={'4'}>
                                        Things to know
                                    </Text>


                                    <List spacing={0}>

                                        <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>Check-in after 2:00 pm
                                        </Chip>
                                        <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>2 guests maximum
                                        </Chip>
                                        <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>No parties or events
                                        </Chip>
                                        <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>No smoking
                                        </Chip>
                                        <Chip radius='md' color='warning' variant='shadow' colorScheme='yellow' className='m-2'>No pets
                                        </Chip>
                                    </List>
                                </Box>
                                {/* things to know end */}

                            </Stack>
                        </Stack>

                        {/* book start */}
                        <Stack>
                            <Tabs variant='soft-rounded' colorScheme='pink'>
                                {/* tabs start */}
                                <TabList>
                                    <Tab onClick={()=>{values.lname=''; values.date=''; values.fname=''; values.gender=''; values.iam=''; values.number=''}} color={'white'}>Schedule a visit</Tab>
                                    <Tab onClick={() => { values.lname = ''; values.date = ''; values.fname = ''; values.gender = ''; values.iam = ''; values.number = '' }} color={'white'}>Reserve Now</Tab>
                                </TabList>
                                {/* tabs end */}
                                <TabPanels>

                                    {/* schedule visit start */}
                                    <TabPanel>
                                        <Card bg={'#60c3ad1f'}>
                                            <CardBody>
                                                <div className="w-full flex flex-row gap-3">
                                                    <Input color={'white'} onValueChange={(value) => { values.fname = value }}
                                                        fontSize={'1.2em'} placeholder='First Name' />


                                                    <Input color={'white'} onValueChange={(value) => { values.lname = value }}
                                                        fontSize={'1.2em'} placeholder='Last Name' />
                                                </div>
                                                <div className='flex flex-row gap-3'>
                                                    <Input className="pt-5" color={'white'}
                                                        fontSize={'1.2em'} placeholder='Email'
                                                        defaultValue={state.reducer.user.users[0]} isReadOnly
                                                    />
                                                    <Input className="pt-5" color={'white'}
                                                        fontSize={'1.2em'} placeholder='Phone Number' onValueChange={(value) => { values.number = value }} />
                                                </div>


                                                <HStack marginTop={'18px'}>

                                                    <Dropdown >
                                                        <DropdownTrigger>
                                                            <Button
                                                                variant="shadow"
                                                                color='success'
                                                                className="capitalize"
                                                                style={{ width: '100%' }}
                                                            >
                                                                {genderText}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            aria-label="Single selection actions"
                                                            variant="flat"
                                                            disallowEmptySelection
                                                            selectionMode="single"
                                                            selectedKeys={gender}
                                                            onSelectionChange={setGender}
                                                        >
                                                            <DropdownItem key="Male">Male</DropdownItem>
                                                            <DropdownItem key="Female">Female</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button
                                                                variant="shadow"
                                                                color='primary'
                                                                className="capitalize"
                                                                style={{ width: '100%' }}
                                                            >
                                                                {iamText}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            aria-label="Single selection actions"
                                                            variant="flat"
                                                            disallowEmptySelection
                                                            selectionMode="single"
                                                            selectedKeys={iam}
                                                            onSelectionChange={setIam}
                                                        >
                                                            <DropdownItem key="Student">Student</DropdownItem>
                                                            <DropdownItem key="Working Professional">Working Professional</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </HStack>
                                                <Input className="pt-5"
                                                    variant={'shadow'}
                                                    color={'white'}
                                                    fontSize={'1.2em'}
                                                    placeholder="Select Date and Time"
                                                    size="md"
                                                    type="datetime-local"
                                                    onValueChange={(value) => { values.date = value }}
                                                />
                                                <AspectRatio marginTop={'1em'} ratio={16 / 18} >
                                                    <iframe
                                                        title='s'
                                                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4817.053434961666!2d77.19214102063117!3d28.617797473809894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a8f9004367%3A0x2a9b9e455ae3b74b!2sGym%3A%20President&#39;s%20Estate!5e0!3m2!1sen!2sin!4v1687233388667!5m2!1sen!2sin'
                                                    />
                                                </AspectRatio>
                                                <Stack marginTop={'12px'} >
                                                    <Button color="primary" variant="shadow" onClick={handleSchedule}>
                                                        Submit
                                                    </Button>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    </TabPanel>
                                    {/* schedule visit end */}

                                    {/* reserve now start */}
                                    <TabPanel>
                                        <Card bg={'#60c3ad1f'}>
                                            <CardBody>
                                                <div className="w-full flex flex-row gap-3">
                                                    <Input color={'white'} onValueChange={(value) => { values.fname = value }}
                                                        fontSize={'1.2em'} placeholder='First Name' />


                                                    <Input color={'white'} onValueChange={(value) => { values.lname = value }}
                                                        fontSize={'1.2em'} placeholder='Last Name' />
                                                </div>
                                                <div className='flex flex-row gap-3'>
                                                    <Input className="pt-5" color={'white'}
                                                        fontSize={'1.2em'} placeholder='Email'
                                                        defaultValue={state.reducer.user.users[0]} isReadOnly
                                                    />
                                                    <Input className="pt-5" color={'white'}
                                                        fontSize={'1.2em'} placeholder='Phone Number' onValueChange={(value) => { values.number = value }} />
                                                </div>


                                                <HStack marginTop={'18px'}>

                                                    <Dropdown >
                                                        <DropdownTrigger>
                                                            <Button
                                                                variant="shadow"
                                                                color='success'
                                                                className="capitalize"
                                                                style={{ width: '100%' }}
                                                            >
                                                                {genderText}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            aria-label="Single selection actions"
                                                            variant="flat"
                                                            disallowEmptySelection
                                                            selectionMode="single"
                                                            selectedKeys={gender}
                                                            onSelectionChange={setGender}
                                                        >
                                                            <DropdownItem key="Male">Male</DropdownItem>
                                                            <DropdownItem key="Female">Female</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button
                                                                variant="shadow"
                                                                color='primary'
                                                                className="capitalize"
                                                                style={{ width: '100%' }}
                                                            >
                                                                {iamText}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            aria-label="Single selection actions"
                                                            variant="flat"
                                                            disallowEmptySelection
                                                            selectionMode="single"
                                                            selectedKeys={iam}
                                                            onSelectionChange={setIam}
                                                        >
                                                            <DropdownItem key="Student">Student</DropdownItem>
                                                            <DropdownItem key="Working Professional">Working Professional</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </HStack>
                                                <Input className="pt-5"
                                                    variant={'shadow'}
                                                    color={'white'}
                                                    fontSize={'1.2em'}
                                                    placeholder="Select Date and Time"
                                                    size="md"
                                                    type="datetime-local"
                                                    onValueChange={(value) => { values.date = value }}
                                                />
                                                <AspectRatio marginTop={'1em'} ratio={16 / 18} >
                                                    <iframe
                                                        title='s'
                                                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4817.053434961666!2d77.19214102063117!3d28.617797473809894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a8f9004367%3A0x2a9b9e455ae3b74b!2sGym%3A%20President&#39;s%20Estate!5e0!3m2!1sen!2sin!4v1687233388667!5m2!1sen!2sin'
                                                    />
                                                </AspectRatio>
                                                <Stack marginTop={'12px'} >
                                                    <Button color="primary" variant="shadow" onClick={handleReserve}>
                                                        Submit
                                                    </Button>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    </TabPanel>
                                    {/* reserve now end */}
                                </TabPanels>
                            </Tabs>
                        </Stack>
                        {/* book end */}
                    </SimpleGrid>


                    {/* breadcrumb start */}
                    <Breadcrumb color={'white'} fontSize={'1.2em'} spacing='8px' separator={<ChevronRightIcon color='white' />} style={{ fontFamily: 'Aileron-Regular' }}>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleBreadcrumb}>Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleBreadcrumb}>{state.reducer.property.data.record.prop[s].title}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Container>
                {/* breadcrumb end */}

                {/* footer start */}
                <Box
                    width={'full'}
                    color={'white'} style={{ fontFamily: 'Aileron-Regular' }}>
                    <Container as={Stack} maxW={'6xl'} py={5}>
                        <Stack spacing={6}>
                            <Box>
                            </Box>
                            <Text fontSize={'xl'} fontWeight={'500'}>
                                © 2023 Colive. All rights reserved
                            </Text>

                        </Stack>

                    </Container>

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} style={{ fontFamily: 'Aileron-Regular' }}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">{successState}</ModalHeader>
                                    <ModalBody>
                                        <p>
                                            <Lottie style={{height:'300px'}} animationData={sucess}></Lottie>
                                        </p>
                                        <p style={{textAlign:'center'}}>
                                            ✳ Ref ID - {localStorage.getItem('ref')}
                                        </p>
                                        <p style={{ textAlign: 'center'}}>
                                            ✳ Date - {values.date.slice(0,10)}
                                        </p>
                                        <p style={{ textAlign: 'center' }}>
                                            ✳ Time - {values.date.slice(11)}
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onPress={onClose}>
                                            Done
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                </Box>
                {/* footer start */}


            </Box>
        )

}

export default PropPage