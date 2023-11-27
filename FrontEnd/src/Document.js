import { Box, Input, useToast } from '@chakra-ui/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image, User } from "@nextui-org/react";

import { persistor } from "../src/redux/store";
import { clearUser } from './redux/slice/userslice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
function Document() {
    const navigate = useNavigate();
    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']
    const dispatch = useDispatch()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // get user from redux store
    const state = useSelector((state) => {
        return state.reducer.user
    })

    //
    const images = ['https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692602506/project/prototypes/sign_up_pppri5.png', 'https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692602506/project/prototypes/login_xjzzrh.png', 'https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692602506/project/prototypes/forgot_password_tynyjo.png', 'https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692602507/project/prototypes/dashboard_umjgdr.png', 'https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692602507/project/prototypes/search_si8oic.png', 'https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692602507/project/prototypes/property_gqjor8.png', 'https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692602506/project/prototypes/bookings_kjwxlw.png', 'https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692602506/project/prototypes/update_details_kwq69d.png', 'https://res.cloudinary.com/eaglestudiosindia/image/upload/v1692602506/project/prototypes/faqs_ilnlku.png']


    // document title
    useEffect(() => {
        document.title = 'Document ✳ Colive'
        onOpen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    var password = '';
    const handleCHange = (e) => {
        password = e.target.value
        console.log(password)
    }

    


    return (
        <Box className='dash' style={{ paddingBottom: '5em' }}>
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


            <div className='myac' style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ fontSize: '3em', color: 'white' }}>WIREFRAME</h1>
                <iframe title='prototype' style={{ width: '1290px', height: '1000px' }} src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fa85kU0h5EOVUA8FUfmceuK%2FCOLIVE-(Copy)%3Ftype%3Ddesign%26node-id%3D301-27%26t%3D6LMiVAnjQTR4wkcc-1%26scaling%3Dscale-down%26page-id%3D0%253A1%26starting-point-node-id%3D301%253A27%26mode%3Ddesign" allowFullScreen></iframe>


                <h1 style={{ fontSize: '3em', color: 'white' }}>PROTOPTYES</h1>

                <div>
                    {images.map((item) => {
                        return (
                            <Image key={item} style={{ width: '1290px', margin: '2em' }} src={item}></Image>)
                    })}
                </div>
            </div>





            <Modal className='res' backdrop='blur' size='l3xl' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">WARNING</ModalHeader>
                            <ModalBody>
                                <p>
                                    Your are not authorized to view this page !
                                </p>
                                <Input onChange={handleCHange} className='input' placeholder='enter password' type='password'></Input>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={()=>{
                                    if(password === 'colive') {
                                        toast({
                                            title: `authorized`,
                                            status: statuses[0],
                                            isClosable: true,
                                        })
                                        onClose()
                                    }
                                    else {
                                        toast({
                                            title: `passwords does not match`,
                                            status: statuses[2],
                                            isClosable: true,
                                        })
                                    }
                                }}>
                                    authorize
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Box>


    )
}

export default Document