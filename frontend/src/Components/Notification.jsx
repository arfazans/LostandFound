import React from 'react'
import { NavLink } from 'react-router-dom';
import Itemresolve from './Itemresolve';
import { useState, useEffect } from 'react';
import axios from 'axios'
import useNotification from '../CustomHook/useNotification';
import notificationSound from '../../Assets/new-notification-09-352705.mp3'
import GeneralMessages from './GeneralMessages';

function Notification() {

    const URL = "https://lostandfound-backend-mrbb.onrender.com"


    const [resolutionmessages, setresolutionmessages] = useState([]);
    const [generalmessage, setgeneralmessage] = useState([]);

    const { handleGeneralNotificationClick, handleResolutionNotificationClick } = useNotification(notificationSound);

    const [loading, setLoading] = useState(true);
    const [notificationType, setnotificationType] = useState("General");

    const handleResolutionButtonClick = () => {
        setnotificationType("Resolution")
        handleResolutionNotificationClick();
    }
    const handleGeneralButtonClick = () => {
        setnotificationType("General")
        handleGeneralNotificationClick();
    }

    useEffect(() => {
        getResolutionMessages();

        getGeneralMessages();
    }, [])


    const getResolutionMessages = async () => {
        try {
            const res = await axios.get(`${URL}/resolving/getAllResolvingItems`);
            setresolutionmessages(res.data);


        } catch (error) {
            console.error("Error fetching reoslvingitems:", error);
        } finally {
            setLoading(false);
        }
    }

    const getGeneralMessages = async () => {
        try {
            const res = await axios.get(`${URL}/resolving/getAlldiscardedResolution`);
            console.log("mera message", res.data);
            setgeneralmessage(res.data);
        } catch (error) {
            console.error("Error fetching DiscardedResolution:", error);
        } finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     getResolutionMessages();
    //     getGeneralMessages();
    // }, []);

    const specificemail = localStorage.getItem('email');
    const resolutionfilteredItems = resolutionmessages.filter(item => item.resolverEmail === specificemail);
    const generalfilterItems = generalmessage.filter(item => item.resolvingEmail === specificemail);



    return (

        <div className='dark:bg-neutral-800 min-h-dvh max-h-max  h-screen  overflow-auto box-border'>


            <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-gray-900 border-b border-gray-200 text-sm py-2.5  dark:bg-neutral-950 dark:border-neutral-700">
                <nav className="max-w-[85rem] mx-auto w-full flex justify-between items-center px-4 sm:px-6 lg:px-8">

                    <div className="me-5 text-amber-600 text-2xl">
                        {/* <!-- Logo --> */}
                        {/* <img className='w-10 h-4' src={logo} alt="OOPS!" /> */}
                        𝓛𝓸𝓼𝓽 & 𝓕𝓸𝓾𝓷𝓭
                        {/* <!-- End Logo --> */}
                    </div>



                    <div className="flex-1 flex flex-row justify-end items-center gap-1">
                        {/* <!-- Collapse --> */}
                        <div className="md:hidden">
                            <button type="button" className="hs-collapse-toggle size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white hover:bg-white/10 focus:outline-hidden focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" id="hs-secondaru-navbar-collapse" aria-expanded="false" aria-controls="hs-secondaru-navbar" aria-label="Toggle navigation" data-hs-collapse="#hs-secondaru-navbar">
                                <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                <svg className="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                <span className="sr-only">Toggle navigation</span>
                            </button>
                        </div>
                        {/* <!-- End Collapse --> */}



                        {/* <!-- Dropdown --> */}
                        <div className="transition-transform duration-300 hover:scale-110  hs-dropdown [--placement:bottom-right] relative inline-flex">
                            <NavLink to={'/profile'} id="hs-dropdown-account" type="button" className="size-9.5 ml-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none dark:text-black" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                                <img className="shrink-0 size-9.5 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
                            </NavLink>
                        </div>
                        {/* <!-- End Dropdown --> */}
                    </div>
                </nav>
            </header>
            {/* <!-- ========== END HEADER ========== --> */}
            {/* <!-- ========== MAIN CONTENT ========== --> */}
            <main id="content" >
                {/* <!-- Secondary Navbar --> */}
                <div className="md:py-4 bg-white  border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
                    <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:gap-3 px-4 sm:px-6 lg:px-8">
                        {/* <!-- Collapse --> */}
                        <div id="hs-secondaru-navbar" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-secondaru-navbar-collapse">
                            <div className="overflow-hidden overflow-y-hidden max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-y-0.5 md:gap-y-0 md:gap-x-6">
                                    <NavLink
                                        className=" px-2 transition-transform duration-300 hover:scale-110 cursor-pointer  py-2 md:py-0 flex items-center font-medium text-sm text-red-600 focus:outline-hidden focus:text-red-600 dark:text-red-500 dark:focus:text-red-500" arial-current="page"
                                        to={'/'}
                                    >
                                        <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                                        Dashboard
                                    </NavLink>
                                    <NavLink


                                        className={({ isActive }) =>
                                            `  py-2 md:py-0 flex items-center font-medium text-sm
                        focus:outline-hidden
                       ${isActive ? "dark:text-blue-500 dark:focus:text-blue-500" : "text-white"}`
                                        }
                                        to={'/resolvedItems'}
                                    >

                                        <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>

                                        <span className="inline-block transition-transform duration-300 hover:scale-110">
                                            Resolved Items
                                        </span>


                                    </NavLink>




                                    <NavLink


                                        className={({ isActive }) =>
                                            `transition-transform duration-300 hover:scale-110 cursor-pointer  py-2 md:py-0 flex items-center font-medium text-sm
                        focus:outline-hidden
                       ${isActive ? "dark:text-blue-500 dark:focus:text-blue-500" : "text-white"}`
                                        }
                                        to={'/reportli'} >

                                        <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>
                                        Report Lost Items

                                    </NavLink>

                                    <NavLink
                                        className={({ isActive }) =>
                                            `transition-transform duration-300 hover:scale-110 cursor-pointer  py-2 md:py-0 flex items-center font-medium text-sm
                        focus:outline-hidden
                       ${isActive ? "dark:text-blue-500 dark:focus:text-blue-500" : "text-white"}`
                                        }

                                        to={'/reportfi'}
                                    >
                                        <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12h.01" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M22 13a18.15 18.15 0 0 1-20 0" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
                                        Report Found Items
                                    </NavLink>



                                    {/* <!-- Dropdown --> */}{/* <!-- End Dropdown --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- End Collapse --> */}
                    </nav>
                </div>
                {/* <!-- End Secondary Navbar --> */}
            </main>

          <div className='flex w-full h-14 gap-4  justify-around p-2 items-center'>
                <button onClick={handleGeneralButtonClick} className={`transition-all rounded-md flex-1 h-full  shadow-2xs bg-gradient-to-r from-dark:bg-neutral-800 to-dark:bg-neutral-600 shadow-blue-200 hover:text-lg hover:text-orange-600 cursor-pointer whitespace-nowrap  p-1.5 border border-white ${notificationType === "General" ? "text-red-500" : "text-white"
                    }`} >General Messages</button>


                <button onClick={handleResolutionButtonClick} className={`transition-all rounded-md flex-1 h-full shadow-2xs bg-gradient-to-r from-dark:bg-neutral-800 to-dark:bg-neutral-600 shadow-blue-200 hover:text-lg hover:text-orange-600 cursor-pointer whitespace-nowrap p-1.5 border border-white ${notificationType === "Resolution" ? "text-red-500" : "text-white"
                    }`}>Resolution Messages</button>

            </div>

            {
                notificationType === "General" ? (

                    <div className="card w-full h-max dark:bg-neutral-800 text-white">
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            {/* <!-- Flex --> */}
                            {
                                loading ? (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-600  text-center">Loading...</div>
                                ) : (
                                    generalmessage.length > 0 ? (
                                        generalfilterItems.length > 0 ? (
                                            generalfilterItems.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="gap-6  flex flex-col"
                                                >
                                                    <GeneralMessages key={index} getItem={getGeneralMessages} {...item} id={item._id} />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-600  text-center">No Messages for this User</div>
                                        )
                                    ) : (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-amber-600 text-center">Message Empty</div>
                                    )
                                )
                            }




                        </div>
                    </div>

                ) : (
                    <div className="card w-full h-max dark:bg-neutral-800 text-white">
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            {/* <!-- Grid --> */}
                            <div className="grid  h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {
                                    loading ? (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-600  text-center">Loading...</div>
                                    ) : (
                                        resolutionmessages.length > 0 ? (
                                            resolutionfilteredItems.length > 0 ? (
                                                resolutionfilteredItems.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="card-container flex flex-col"
                                                    >
                                                        <Itemresolve key={index} {...item} getItem={getResolutionMessages} id={item._id} />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-600  text-center">No notification for this User</div>
                                            )
                                        ) : (
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-amber-600 text-center">Notification Empty</div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Notification



