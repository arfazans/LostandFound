import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useNotification, config } from '../../../shared';
import notificationSound from '../../../shared/assets/new-notification-09-352705.mp3'
import { ResolvedFoundItemCard } from './cards';
import { ResolvedLostItemCard } from './cards';

function DisplayResolved() {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [filterItem, setfileterItem] = useState('all');
  const [searchkey, setsearchkey] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [products, setproducts] = useState([]);


const URL = config.API_URL;
// const URL = "http://localhost:9780"

  const navigate = useNavigate();

  const { unreadCount, newNotificationReceived,handleGeneralNotificationClick } = useNotification( notificationSound );
const handlenotificationButtonClick = ()=>{
  // handleNotificationClick();
  navigate('/notificaiton')
  handleGeneralNotificationClick();
}

  //Geting all items

  const getData = async () => {
    try {

      const res = await axios.get(`${URL}/resolving/getAllResolvedItems`);
      setproducts(res.data);
      // console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    getData();
  }, []);


  //End Geting all items

  const litem = () => {
    setfileterItem('lost');
    setIsSearchMode(false); // turn off search mode
  }
  const fitem = () => {
    setfileterItem('found');
    setIsSearchMode(false); // turn off search mode
  }
  const allitem = () => {
    setfileterItem('all');
    setIsSearchMode(false); // turn off search mode
  }
  return (

    <div className='dark:bg-neutral-800 h-screen overflow-auto box-border'>
      {/* <!-- ========== HEADER ========== --> */}
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-gray-900 border-b border-gray-200 text-sm py-2.5  dark:bg-neutral-950 dark:border-neutral-700">
        <nav className="max-w-[85rem] mx-auto w-full flex md:grid md:grid-cols-3 md:gap-x-1 basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="me-5 text-amber-600 text-2xl">
            {/* <!-- Logo --> */}
            {/* <img className='w-10 h-4' src={logo} alt="OOPS!" /> */}
            𝓛𝓸𝓼𝓽 & 𝓕𝓸𝓾𝓷𝓭
            {/* <!-- End Logo --> */}
          </div>

          <div className="hidden md:block">
            {/* <!-- Search Input --> */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                <svg className="shrink-0 size-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
              <input type="text" className="  py-2 ps-10 pe-16 block w-full bg-transparent border-white rounded-lg text-sm focus:outline-hidden focus:border-white focus:ring-1 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:border-neutral-600" placeholder="Search"

                value={searchkey}
                onChange={(e) => setsearchkey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsSearchMode(true); // trigger search mode
                  }
                }}
              />
              <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
                <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" aria-label="Close">
                  <span className="sr-only">Close</span>
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                </button>
              </div>

            </div>
            {/* <!-- End Search Input --> */}
          </div>

          <div className="flex-1 flex flex-row justify-end items-center gap-1">
            {/* <!-- Collapse --> */}
            <div className="md:hidden">
              <button type="button" className="hs-collapse-toggle size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white hover:bg-white/10 focus:outline-hidden focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" id="hs-secondaru-navbar-collapse" aria-expanded="false" aria-controls="hs-secondaru-navbar" aria-label="Toggle navigation" data-hs-collapse="#hs-secondaru-navbar">
                <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>

                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
            {/* <!-- End Collapse --> */}

                  {/* Mobile Search Button */}
          <button
            type="button"
            className="md:hidden  size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white hover:bg-white/10 focus:outline-hidden focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <span className="sr-only">Search</span>
          </button>

          {/* Mobile Search Input */}
          {showMobileSearch && (
            <div className="md:hidden  absolute top-full left-0 right-0 bg-gray-900 p-2 z-50 ">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                  <svg className="shrink-0 size-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                </div>
                <input
                  type="text"
                  className="py-2 ps-10 pe-4 block w-full bg-gray-800 border-white rounded-lg text-sm focus:outline-hidden focus:border-white focus:ring-1 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:border-neutral-600"
                  placeholder="Search"
                  value={searchkey}
                  onChange={(e) => setsearchkey(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsSearchMode(true);
                      setShowMobileSearch(false);
                    }
                  }}
                  autoFocus
                />
              </div>
            </div>
          )}

            <button onClick={handlenotificationButtonClick} type="button" className="transition-transform duration-300 mr-2 hover:scale-110 size-9.5 cursor-pointer relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-white hover:bg-white/10 focus:outline-hidden focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none">
              <div className="relative">
                <svg className={`shrink-0 size-4 ${unreadCount > 0 ? 'text-red-500' : ''} ${newNotificationReceived ? 'new-notification' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2">
                    {unreadCount}
                  </span>
                )}
              </div>
              <style jsx>{`
        .new-notification {
          animation: ring 3s ease-in-out;
        }
        @keyframes ring {
          0% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(15deg) scale(1.2);
          }
          50% {
            transform: rotate(-15deg) scale(1.2) ;
          }
          75% {
            transform: rotate(15deg) scale(1.2) ;
          }
          100% {
            transform: rotate(0deg) scale(1) ;
          }
        }
      `}</style>
              <span className="sr-only">Notifications</span>
            </button>


            {/* <!-- Dropdown --> */}
            <div className="transition-transform duration-300 hover:scale-110 ml-2  hs-dropdown [--placement:bottom-right] relative inline-flex">
              <NavLink to={'/profile'} id="hs-dropdown-account" type="button" className="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none dark:text-black" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <img className="shrink-0 size-9.5 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
              </NavLink>
            </div>
            {/* <!--End Dropdown --> */}

          </div>
        </nav >
      </header >
      {/* <!-- ========== END HEADER ========== --> */}


      {/* <!-- ========== MAIN CONTENT ========== --> */}
     <main className={`sticky ${showMobileSearch ? 'mt-4' : ''}`} id="content" >
        {/* <!-- Secondary Navbar --> */}
        <div className="  md:py-4 bg-white md:border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
          <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:gap-3 px-4 sm:px-6 lg:px-8">
            {/* <!-- Collapse --> */}
            <div id="hs-secondaru-navbar" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-secondaru-navbar-collapse">
              <div className="overflow-hidden overflow-y-hidden max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-y-0.5 md:gap-y-0 md:gap-x-6">
                  <NavLink className=" px-2  py-2 md:py-0 flex items-center font-medium text-sm text-red-600 focus:outline-hidden focus:text-red-600 dark:text-red-500 dark:focus:text-red-500" aria-current="page"

                    to={'/'}
                  >

                    <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                    <span className="inline-block transition-transform duration-300 hover:scale-110">
                      Dashboard
                    </span>

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
                      `  py-2 md:py-0 flex items-center font-medium text-sm
    focus:outline-hidden
   ${isActive ? "dark:text-blue-500 dark:focus:text-blue-500" : "text-white"}`
                    }
                    to={'/reportli'}

                  >
                    <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>


                    <span className="inline-block transition-transform duration-300 hover:scale-110">

                      Report Lost Items
                    </span>

                  </NavLink>


                  <NavLink


                    className={({ isActive }) =>
                      `  py-2 md:py-0 flex items-center font-medium text-sm
    focus:outline-hidden
   ${isActive ? "dark:text-blue-500 dark:focus:text-blue-500" : "text-white"}`
                    }


                    to={'/reportfi'}
                  >
                    <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12h.01" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M22 13a18.15 18.15 0 0 1-20 0" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>

                    <span className="inline-block transition-transform duration-300 hover:scale-110">

                      Report Found Items
                    </span>
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
      {/* <!-- ========== END MAIN CONTENT ========== -->  */}

      {/* <!-- your content goes here ... --> */}

      <div className="max-w-[85rem] min-h-min mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className='lg:flex lg:justify-between lg:items-center'>
          <h1 className='font-extrabold text-white text-3xl'>Most Recent Lost and Found Items</h1>
          <div className='flex flex-col gap-2 sm:flex-row sm:m-3 '>
            <button onClick={litem} className="button1">
              <span className="button_lg">
                <span className="button_sl"></span>
                <span className="button_text">Lost Items</span>
              </span>
            </button>
            <button onClick={fitem} className="button1">
              <span className="button_lg">
                <span className="button_sl"></span>
                <span className="button_text">Found Items</span>
              </span>
            </button>
            <button onClick={allitem} className="button1">
              <span className="button_lg">
                <span className="button_sl"></span>
                <span className="button_text">All Items</span>
              </span>
            </button>
          </div>
        </div>
      </div>




      {/* Cards */}


      <div className="card w-full h-max dark:bg-neutral-800 text-white">


        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto relative">
          {/* <!-- Grid --> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">



            {

              products.length > 0 ?(
              products
                .filter(product => {
                  if (isSearchMode) {
                    return product.name.toLowerCase().includes(searchkey.toLowerCase());
                  } else {
                    return filterItem === 'all' || product.type === filterItem;
                  }
                })
                .map((product) => {
                  // Construct the image URL
                  const imageUrl = `http://localhost:9780/${product.images}`;
                  // console.log(imageUrl);


                  if (product.type === 'lost') {
                    return (
                      <ResolvedLostItemCard key={product._id} id={product._id}  {...product} imageUrl={imageUrl} />
                    )

                  } else if (product.type === 'found') {
                    return (
                      <ResolvedFoundItemCard key={product._id} id={product._id} {...product} imageUrl={imageUrl} />
                    )
                  }
                })
              ):(
                   <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2  text-amber-600 text-center">No Data found</div>
              )
            }

          </div>
        </div>


      </div>

    </div>
  )
}

export default DisplayResolved
