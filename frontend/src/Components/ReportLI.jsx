import axios from 'axios';
import React, { useRef } from 'react'
import { useState, } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import notificationSound from '../../Assets/new-notification-09-352705.mp3'
import useNotification from '../CustomHook/useNotification';



//alert Message
const StyledWrapper = styled.div`
  .error {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: max-content;
    max-width: 100%;
 flex-wrap: nowrap; /* Changed to nowrap */
    padding: 0.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin-top:0.8rem;
    margin-left:2rem;
    background: #FCE8DB4D;
    border-radius: 8px;
    box-shadow: 0px 0px 5px -3px #111;
    cursor:pointer;
    overflow: hidden;
          @media (min-width: 768px) {
      margin-left: 2rem;
    }


  }

  @media (max-width:767px){
    .error{
    margin-left: 1rem;
      flex-wrap: nowrap; /* Ensure icon and text stay on the same line */
      align-items: center; /* Ensure icon and text are vertically centered */
    }
  }
  .error__icon {
    width: 1.25rem;
    height: 1.25rem;
    transform: translateY(-0.125rem);
    margin-right: 8px;
  }

  .error__icon path {
    fill: #EF665B;
  }

  .error__title {
    font-weight: 500;
    font-size: 14px;
    color: black;
  }

  .error__close {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: auto;
  }

  .error__close path {
    fill: #71192F;
  }`;

//alert Message




function ReportLI() {

const URL = "https://lostandfound-backend-mrbb.onrender.com"


  const [imagePreview, setImagePreview] = useState(null);
  const [items, setitems] = useState({});
  const [imageUpload, setImageUpload] = useState(null);
  const formref = useRef();









  const { unreadCount, newNotificationReceived,handleGeneralNotificationClick } = useNotification(notificationSound);


  const navigate = useNavigate();

  const handlenotificationButtonClick = () => {
    // handleNotificationClick();
    navigate('/notificaiton');
    handleGeneralNotificationClick();
  }











  // navigate to loginorSignup

  const gotoprofile = () => {
    navigate('/profile');
  }
  // navigate to loginorSignup






  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageUpload(e.target.files[0]);  // store the actual file
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };


  const handleChange = (e) => {
    setitems({ ...items, [e.target.name]: e.target.value });
  }


  const handleFormSubmit = async (e) => {
      if (!localStorage.getItem('email')) {
      return(
        alert("Please Login First")
      )
    }
    e.preventDefault();

    const formData = new FormData();

    // Append all product fields
    for (let key in items) {
      formData.append(key, items[key]);
    }

    formData.append('type', 'lost');


    // Append the file
    if (imageUpload) {
      formData.append('image', imageUpload);
    }


    // if user login and then reporting (to track the items reported by the login users)

    if (localStorage.getItem('email')) {
      let userinsert = localStorage.getItem('email');
      formData.append('userTrack', `insertedBy${userinsert}`);
    }

    // if user login and then reporting (to track the items reported by the login users)



    // Reset state
    setitems({});
    setImageUpload(null);
    setImagePreview(null);
    formref.current.reset(); // reset the actual form fields

    try {
      const response = await axios.post(`${URL}/products/report`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully:', response.data);
      alert("Item Added Succefully Thanks for you efforts")
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("kindly fill the data properly every feild");
    }

    this.reset();

  };






  return (
    <div className='dark:bg-neutral-800 h-screen  overflow-auto box-border'>
      {/* <!-- ========== HEADER ========== --> */}
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
            {/* <!-- End Dropdown --> */}
          </div>
        </nav>
      </header>
      {/* <!-- ========== END HEADER ========== --> */}
      {/* <!-- ========== MAIN CONTENT ========== --> */}
      <main id="content" >
        {/* <!-- Secondary Navbar --> */}
        <div className="md:py-4 bg-white md:border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
          <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:gap-3 px-4 sm:px-6 lg:px-8">
            {/* <!-- Collapse --> */}
            <div id="hs-secondaru-navbar" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-secondaru-navbar-collapse">
              <div className="overflow-hidden overflow-y-hidden max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-y-0.5 md:gap-y-0 md:gap-x-6">
                  <NavLink
                    className="transition-transform duration-300 hover:scale-110 cursor-pointer  py-2 md:py-0 flex items-center font-medium text-sm text-red-600 focus:outline-hidden focus:text-red-600 dark:text-red-500 dark:focus:text-red-500" arial-current="page"
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


      {/* Your Content Goes Here */}

      {
        !localStorage.getItem("email") && (
          <div onClick={gotoprofile} className="alert">
            <StyledWrapper>
              <div className="error">
                <div className="error__icon">
                  <svg fill="none" height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37" /></svg>
                </div>
                <div className="error__title">Kindly, LogIn or SignUp before reporting items</div>
              </div>
            </StyledWrapper>
          </div>
        )
      }





      <div className='flex justify-center items-center mt-5'>
        <h1 className='md:ml-0 ml-4 text-3xl text-white'>Report Lost Items, Reunite with What Matters</h1>
      </div>

      {/* <!-- Card Section --> */}

      <div className="max-w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Card --> */}
        <div className="bg-white lg:max-w-full rounded-xl shadow-xs p-4 sm:p-7 dark:bg-neutral-900">
          <form ref={formref} onSubmit={handleFormSubmit}  >
            {/* <!-- Section --> */}
            <div className="grid lg:grid-cols-2 gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">

              <div className="lg:col-span-2 ">
                <h2 className="text-lg text-center font-semibold text-gray-800 dark:text-neutral-200">
                  Report the Lost items here!!
                </h2>
              </div>

              {/* Your Details Section */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  Your Details
                </h2>
              </div>

              <div className="lg:col-span-1 flex items-center">
                <label htmlFor="af-submit-application-full-name" className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500">
                  Full name
                </label>
              </div>
              <div className="lg:col-span-1">
                <input name='OwnerName' onChange={handleChange} id="af-submit-application-full-name" type="text"
                  className="py-1.5 sm:py-2 px-3 pe-11 block w-full border border-gray-300 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />

              </div>

              <div className="lg:col-span-1 flex items-center">
                <label htmlFor="af-submit-application-phone" className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500">
                  Phone
                </label>
              </div>
              <div className="lg:col-span-1">
                <input name='phoneNumber' onChange={handleChange} id="af-submit-application-phone" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full
          border border-gray-300 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
              </div>



              {/* About Lost Item Section */}
              <div className="lg:col-span-2 pt-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  About Lost Item
                </h2>
              </div>

              <div className="lg:col-span-1 flex items-center">
                <label htmlFor="af-submit-application-item-name" className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500">
                  Item name
                </label>
              </div>
              <div className="lg:col-span-1">
                <input name='name' onChange={handleChange} id="af-submit-application-item-name" type="text" className="py-1.5 sm:py-2 px-3 pe-11 block w-full border border-gray-300shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
              </div>

              <div className="lg:col-span-1 flex items-center">
                <label htmlFor="af-submit-application-image" className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500">
                  Upload item Image ( if any )
                </label>
              </div>
              <div className="lg:col-span-1">
                <input type="file" accept="image/*" id="af-submit-application-image" onChange={handleImageChange} name="images" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-neutral-700 dark:file:text-neutral-400" />
              </div>




              <div className="lg:col-span-2 ">

                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-48 h-48 object-contain border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>




              <div className="lg:col-span-1 flex items-center">
                <label htmlFor="af-submit-application-description" className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500">
                  Description
                </label>
              </div>
              <div className="lg:col-span-1">
                <textarea onChange={handleChange} name='description' maxLength={40} id="af-submit-application-description" className="py-1.5 sm:py-2 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows="3" placeholder="Write Something about the item which describe it correctly like { color, design, brand, size etc }"></textarea>
              </div>

              <div className="lg:col-span-1 flex items-center">
                <label htmlFor="af-submit-application-message" className="inline-block text-sm font-medium text-gray-500 dark:text-neutral-500">
                  Message
                </label>
              </div>
              <div className="lg:col-span-1">
                <textarea onChange={handleChange} name='message'maxLength={40} id="af-submit-application-message" className="py-1.5 sm:py-2 px-3 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows="3" placeholder="What to do when someone found it"></textarea>
              </div>
            </div>

            <div className="py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                Submit application
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                Thanks for the details, Kindly Check the the items under found items Tab regularly !!
              </p>
              <button type="submit" className="w-full lg:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                Submit application
              </button>
            </div>
          </form>
        </div>
      </div>








    </div>
  )
}

export default ReportLI
