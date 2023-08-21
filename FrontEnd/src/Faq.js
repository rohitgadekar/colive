import { Accordion, AccordionItem } from "@nextui-org/react";
import { Box } from '@chakra-ui/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { persistor } from "../src/redux/store";
import { clearUser } from './redux/slice/userslice';
import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function Faq() {

    // get user from redux store
    const state = useSelector((state) => {
        return state.reducer.user
    })
   
    const navigate = useNavigate();


    const dispatch = useDispatch()

    // document title
    useEffect(() => {
        document.title = 'Faqs ✳ Colive'
    }, [])

    return (
        <Box className='dash' style={{ paddingBottom: '5em' }}>
            {/* header */}
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


            <div className='myac' style={{ fontFamily: 'Aileron-Regular' }}>
                <div >
                    <div className='accord'>
                        <Accordion variant="splitted" style={{widows:'20em'}} >
                            <AccordionItem key="1" aria-label="Accordion 1" title="Colive avaliable in my city?" >
                                yes, colive is live in 8+ cities
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Accordion 2" title="Can i buy properties with colive?">
                                yes, you can buy as well as rent 
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Accordion 3" title="Can booking be cancelled?">
                                Yes, Bookings can be cancelled
                            </AccordionItem>
                            <AccordionItem key="4" aria-label="Accordion 3" title="How to create account?">
                                Just Signup and create account
                            </AccordionItem>
                            <AccordionItem key="5" aria-label="Accordion 3" title="How can i schedule a visit?">
                                Search the property and schedule 
                            </AccordionItem>
                            <AccordionItem key="6" aria-label="Accordion 3" title="How can i reserve a property?">
                                Search the property and reserve
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                
            </div>
            

        </Box>


    )
}

export default Faq