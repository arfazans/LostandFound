import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LostItemCard, FoundItemCard } from '../../items';
import { NavLink, useNavigate } from 'react-router-dom';
import { Notecontext, useNotification, config } from '../../../shared';
import notificationSound from '../../../shared/assets/new-notification-09-352705.mp3'



function User_DetailCard() {


const URL = config.API_URL;


  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('Image'));
  const [products, setproducts] = useState([]);
  const [filterItem, setfileterItem] = useState('all');
  const [searchkey, setsearchkey] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [mode, setMode] = useState('Edit Profile');
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [inputValue, setInputValue] = useState('');
  const [loading,setLoading] = useState(true)



  const { unreadCount, newNotificationReceived ,handleGeneralNotificationClick} = useNotification(notificationSound);



  const handlenotificationButtonClick = () => {
    // handleNotificationClick();
    navigate('/notificaiton')
    handleGeneralNotificationClick();
  }





  const navigate = useNavigate();
  //Notification System















  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setInputValue(storedUsername); // Initialize inputValue with stored username
    }
  }, []);
  const handleModeChange = async () => {
    if (mode === 'Edit Profile') {
          const currentusername = localStorage.getItem('username'); // Get the current username before removing it
          localStorage.setItem('usernamebeforeedit', currentusername)

      localStorage.removeItem('Image');
      localStorage.removeItem('username');
      setProfileImage('');
      setUsername('');
      setInputValue(''); // Clear the input value as well

      setMode('Save Changes');
    } else {
      // const currentusername = localStorage.getItem('username');
      if (inputValue.trim()) {
        localStorage.setItem('username', inputValue);
        setUsername(inputValue);
        // Changing Username from the backend
    try {
     const currentUsername=  localStorage.getItem('usernamebeforeedit');
      const res = await axios.put(`${URL}/movingitem/updateusernamefrombackend`, {inputValue,currentUsername});
      console.log(res);
      console.log("Username Updated Successfully into the backend");

    } catch (error) {
      console.log(error);
      console.log("Error while updating Username in the backend");


    }
      } else {
        // If no input, clear the username
        localStorage.removeItem('username');
        setUsername('');
      }
      if (profileImage) {
        localStorage.setItem('Image', profileImage);
      } else {
        localStorage.removeItem('Image');
      }
      setMode('Edit Profile');
    }
  };
  const handleInputChange =async (e) => {
    setInputValue(e.target.value);

  };

  const userEmail = localStorage.getItem('email');
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; // If no file selected, do nothing
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // Immediately update the UI with the new image
      setProfileImage(base64String);
      // But don't save to localStorage until "Save Changes" is clicked
    };
    reader.readAsDataURL(file);
  };



  useEffect(() => {
    const storedImage = localStorage.getItem('Image');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${URL}/products`);
      setproducts(res.data);
      // console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    getData();
  }, []);
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
  //logout
  const { logedOut } = useContext(Notecontext);
  const logout = () => {
    logedOut();

    window.location.reload();
  }
  //logout
  const filteredProduct = products.filter((product) => {
    return product.userTrack === `insertedBy${userEmail}`;
  })
  // console.log(filteredProduct);
  return (
    <div className='dark:bg-neutral-800 h-screen  overflow-auto box-border'>
      {/* <!-- ========== HEADER ========== --> */}
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-gray-900 border-b border-gray-200 text-sm py-2.5  dark:bg-neutral-950 dark:border-neutral-700">
        <nav className=" max-w-[85rem] mx-auto w-full flex md:grid md:grid-cols-3 md:gap-x-1 basis-full items-center px-4 sm:px-6 lg:px-8">
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
                  <button


                    className="py-2 md:py-0 flex items-center font-medium text-sm text-red-600 focus:outline-hidden  focus:text-red-600 dark:text-red-500 dark:focus:text-red-500 cursor-pointer"


                    onClick={logout}
                  >
                    <span className="inline-block transition-transform duration-300 hover:scale-110">
                      Log Out

                    </span>
                  </button>



                  <button


                    className="py-2 md:py-0 flex items-center font-medium text-sm text-red-600 focus:outline-hidden  focus:text-red-600 dark:text-red-500 dark:focus:text-red-500 cursor-pointer"

                    onClick={handleModeChange}
                  >
                    <span className="inline-block transition-transform duration-300 hover:scale-110">
                      {mode}

                    </span>
                  </button>


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
      <div className="w-full  h-max flex flex-col items-center">
        {/* <div className="bg-[#000000] h-14 w-full"></div> */}
        <div className="mt-8  flex flex-col items-center">
          <div className="mb-5 relative"> {/* Added relative positioning */}
            {/* Always show the image if it exists */}
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full "
              />
            ) : (
              <label
                className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center text-center cursor-pointer"
                htmlFor="image-upload"
              >
                Upload Image
              </label>
            )}

            {/* Show upload button in edit mode (Save Changes mode) */}
            {mode === 'Save Changes' && (
              <>
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                  key={mode}
                />
                {profileImage && (
                  <label
                    htmlFor="image-upload"
                    className="absolute inset-0 w-24 h-24 rounded-full flex justify-center items-center text-center cursor-pointer bg-black bg-opacity-30 text-white opacity-0 hover:opacity-100 transition-opacity"
                  >
                    Change
                  </label>

                )}
              </>
            )}

          </div>

          <div className="text-center">

            {
              mode === 'Edit Profile' ? (
                <h2 className="font-medium text-amber-600 text-2xl mb-2">
                  {username || 'Your Name'}
                </h2>
              ) : (
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder='Your Name'
                  className="font-medium text-center text-amber-600 text-2xl mb-2 w-full bg-transparent border-b-2 border-amber-600 focus:outline-none" />
              )
            }

            <p className="font-normal text-amber-600 text-sm mb-5">{userEmail}</p>
            <button onClick={litem} className="transition-transform duration-300 hover:scale-110  w-26 cursor-pointer h-max pt-1.5 pb-1.5 bg-blue-600  text-white rounded-md font-bold text-sm mx-2 ">Reported  <br />Lost Items</button>
            <button onClick={fitem} className="transition-transform duration-300 hover:scale-110  w-26 cursor-pointer h-max pt-1.5 pb-1.5 bg-blue-600 text-white rounded-md font-bold text-sm mx-2 ">Reported Found Items</button>
            <br />
            <button onClick={allitem} className="transition-transform duration-300 hover:scale-110  w-26 cursor-pointer mt-4 h-max pt-1.5 pb-1.5 bg-red-700 text-white rounded-md font-bold text-sm mx-2 ">All Reported Items</button>

          </div>
        </div>
      </div>
      <hr className='mt-8' />
      {/* Cards */}
     <div className="card w-full h-max dark:bg-neutral-800 text-white">


        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto relative">
          {/* <!-- Grid --> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {
              loading ? (
                 <div className="text-amber-600 ">Loading...</div>
              ) : (
              filteredProduct.length > 0 ? (
                filteredProduct.filter(product => {
                  if (isSearchMode) {
                    return product.name.toLowerCase().includes(searchkey.toLowerCase());

                  } else {
                    return filterItem === 'all' || product.type === filterItem;

                  }
                })
                  .map((product) => {
                    const imageUrl = product.image;
                    if (product.type === 'lost') {
                      return <LostItemCard key={product._id} {...product} imageUrl={imageUrl} />
                    } else if (product.type === 'found') {
                      return <FoundItemCard key={product._id} {...product} imageUrl={imageUrl} />
                    }
                  })
              ) : (<div className=" text-amber-600 ">No Data found</div>)
            )
            }



          </div>
        </div>
      </div>
    </div >
  )
}

export default User_DetailCard;