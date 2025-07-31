import React from 'react'

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../Home.css'
import User_DetailCard from './User_DetailCard';



 //Not Login
  const StyledWrapper = styled.div`
  .loader {
    width: fit-content;
    height: fit-content;

  }

  .truckWrapper {
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    overflow-x: hidden;
  }
  /* truck upper body */
  .truckBody {
    width: 130px;
    height: fit-content;
    margin-bottom: 6px;
    animation: motion 1s linear infinite;
  }
  /* truck suspension animation*/
  @keyframes motion {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(3px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  /* truck's tires */
  .truckTires {
    width: 130px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px 0px 15px;
    position: absolute;
    bottom: 0;
  }
  .truckTires svg {
    width: 24px;
  }

  .road {
    width: 100%;
    height: 1.5px;
    background-color: #282828;
    position: relative;
    bottom: 0;
    align-self: flex-end;
    border-radius: 3px;
  }
  .road::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 100%;
    background-color: #282828;
    right: -50%;
    border-radius: 3px;
    animation: roadAnimation 1.4s linear infinite;
    border-left: 10px solid white;
  }
  .road::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 100%;
    background-color: #282828;
    right: -65%;
    border-radius: 3px;
    animation: roadAnimation 1.4s linear infinite;
    border-left: 4px solid white;
  }

  .lampPost {
    position: absolute;
    bottom: 0;
    right: -90%;
    height: 90px;
    animation: roadAnimation 1.4s linear infinite;
  }

  @keyframes roadAnimation {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(-350px);
    }
  }`;
  //Not Login


function Profile() {


  const navigate = useNavigate();








  //navigation
  const login = () => {
    navigate('/login')
  }
  const signup = () => {
    navigate('/signup')
  }
  //navigation














  if (localStorage.getItem("email")) {
    return  <User_DetailCard />
  }
  return (
    <>

      {/* //Navbar */}

      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-gray-900 border-b border-gray-200 text-sm py-2.5  dark:bg-neutral-950 dark:border-neutral-700">
        <nav className="max-w-[85rem] mx-auto w-full flex md:grid md:grid-cols-3 md:gap-x-1 basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8">
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
                <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                <svg className="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
            {/* <!-- End Collapse --> */}





          </div>
        </nav>
      </header>
      {/* <!-- ========== END HEADER ========== --> */}


      {/* <!-- ========== MAIN CONTENT ========== --> */}
      <main className='sticky' id="content" >
        {/* <!-- Secondary Navbar --> */}
        <div className="md:py-4 bg-white md:border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
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



      {/* //Navbar */}

      <div className="display flex justify-center items-center   dark:bg-neutral-800  h-screen overflow-auto box-border ">


        <StyledWrapper>
          <div className="loader">
            <div className="truckWrapper">
              <div className="truckBody">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93" className="trucksvg">
                  <path strokeWidth={3} stroke="#282828" fill="#F83D3D" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z" />
                  <path strokeWidth={3} stroke="#282828" fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z" />
                  <path strokeWidth={2} stroke="#282828" fill="#282828" d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z" />
                  <rect strokeWidth={2} stroke="#282828" fill="#FFFCAB" rx={1} height={7} width={5} y={63} x={187} />
                  <rect strokeWidth={2} stroke="#282828" fill="#282828" rx={1} height={11} width={4} y={81} x={193} />
                  <rect strokeWidth={3} stroke="#282828" fill="#DFDFDF" rx="2.5" height={90} width={121} y="1.5" x="6.5" />
                  <rect strokeWidth={2} stroke="#282828" fill="#DFDFDF" rx={2} height={4} width={6} y={84} x={1} />
                </svg>
              </div>
              <div className="truckTires">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                  <circle strokeWidth={3} stroke="#282828" fill="#282828" r="13.5" cy={15} cx={15} />
                  <circle fill="#DFDFDF" r={7} cy={15} cx={15} />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                  <circle strokeWidth={3} stroke="#282828" fill="#282828" r="13.5" cy={15} cx={15} />
                  <circle fill="#DFDFDF" r={7} cy={15} cx={15} />
                </svg>
              </div>
              <div className="road" />
              <svg xmlSpace="preserve" viewBox="0 0 453.459 453.459" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Capa_1" version="1.1" fill="#000000" className="lampPost">
                <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
      c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
      c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
      c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
      h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
      v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
      V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
      M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
      h78.747C231.693,100.736,232.77,106.162,232.77,111.694z" />
              </svg>
            </div>
            <h1 className='text-center mt-3 text-white'>OOPS!! LOGIN FIRST🙄</h1>


            {/* <!-- From Uiverse.io by mrhyddenn -->  */}
            <div className='mt-5 '>

              <button onClick={login} className="button1">
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text">Login</span>
                </span>
              </button>
              <button onClick={signup} className="button1">
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text">SignUp</span>
                </span>
              </button>
            </div>




          </div>
        </StyledWrapper>
      </div>

    </>
  );
}
export default Profile