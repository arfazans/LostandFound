import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';





//dialogebox styel

const StyledWrapper = styled.div`
    .input {
      background-color: #383838;
      border: 1ex solid none;
      border-top-width: 1.7em;
      margin-top: 0.8rem;
      padding: 0;
      color: #383838;
      word-wrap: break-word;
        overflow: hidden;     /* Prevent scroll */
      resize: none;         /* Disable manual resize */
      outline: 7px solid #383838;
      height: 100px;        /* Taller height */
      width: 40vw;
      font-size: 17px;
      text-align: left;
      transition: all .5s;

      font-weight: bold;
      font-family: 'Courier New', Courier, monospace;
    }

    .input:hover, .input:focus {
      border-top-width: 0.2em;
      background-color: #f1e8e8;
      color: #000;
    }`;


// End dialogebox styel


function ProductL({ name, message = 'No Specific Message is Given by the Owner of Item', description = 'No Items Description received from the owner', phoneNumber, imageUrl, OwnerName, userTrack, id }) {

const URL = "https://lostandfound-backend-mrbb.onrender.com"



  const [showOwner, setshowOwner] = useState(false);
  const [showDialogueBox, setshowDialogueBox] = useState(false);
  const [resolvemessage, setresolvemessage] = useState('');



  const sendingResolveMessage = async (e) => {
    e.preventDefault();

    const resolvingEmail = localStorage.getItem('email');
    try {
      const res = await axios.get(`${URL}/user/getUsername?email=${resolvingEmail}`);

      const myphoto = localStorage.getItem('Image');
      const resolvingusername = res.data;
      const itemId = id;
      const message = resolvemessage;
      const resolverEmail = userTrack.replace('insertedBy', '');




      const formData = new FormData();
      formData.append('itemId', itemId);
      formData.append('message', message);
      formData.append('resolvingEmail', resolvingEmail);
      formData.append('resolvingusername', resolvingusername);
      formData.append('resolverEmail', resolverEmail);
      if (myphoto) {
        formData.append('myphoto', myphoto);
      }

      try {
        const res = await axios.post(`${URL}/resolving/createResolvingItem`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res);
        console.log('Resolution Submitted Successfully');
        alert("Resolution Submitted Successfully");
      } catch (err) {
        console.log(err, 'Error Submitting Resolution');
        alert("Error Submitting Resolution");
      }
    } catch (err) {
      console.log(err, 'Error fetching username');
      alert("Error fetching username");
    }

    setresolvemessage(''); // Reset the textarea value
    setshowDialogueBox(false);
  }








   const sendResolveMessage = async() => {
    const resolvingEmail = localStorage.getItem('email');
  const itemId = id;
  const resolverEmail = userTrack.replace('insertedBy', '');

  try {
    const res = await axios.get(`${URL}/resolving/checkalreadyresolutionsend`, {
      params: {
        itemId,
        resolvingEmail,
        resolverEmail
      }
    });

    if (res.data.exists) {
      alert("You have already submitted a resolution for this item. Please wait for acknowledgement.");
    } else {
      setshowDialogueBox(true);
    }
  } catch (err) {
    console.log(err);
    alert("Error checking resolution status");
  }
}


  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">


      {/* Founder Detail Box */}
      {showOwner && (
        <div className="relative z-10 p-4  bg-white border border-gray-300 shadow-lg dark:bg-neutral-800 dark:border-neutral-600">
          <div className='flex justify-between'>
            <h2 className="text-lg font-semibold mb-2 text-rose-600 dark:text-rose-500">Owner Details</h2>
            {/* <!-- From Uiverse.io by javierBarroso --> */}
            <button onClick={() => {
              setshowOwner(false)
            }} className="button">
              <span className="X"></span>
              <span className="Y"></span>
              <div className="close">Close</div>
            </button>

          </div>
          <p className='text-white'>Owner Name: {OwnerName}</p>
          <p className='text-white'>Owner Contact: {phoneNumber}</p>
          {
            !userTrack.includes(localStorage.getItem('email')) && (

              <button type='button' onClick={sendResolveMessage} className=' transition-transform duration-300 hover:scale-110 mt-1 text-black cursor-pointer bg-rose-600 rounded-2xl p-1.5 font-bold '>
                Resolve
              </button>
            )
          }
        </div>
      )}


      {
        showDialogueBox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <StyledWrapper>
              <form onSubmit={sendingResolveMessage} className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg w-[50vw] h-[40vh] flex flex-col items-center justify-center">
                <textarea
                  placeholder="Type your text"
                  className="input"
                  name="text"
                  type="text"
                  maxLength={121}
                  value={resolvemessage}
                  onChange={(e) => setresolvemessage(e.target.value)}
                />

                <div className='flex items-center justify-center gap-20 '>
                  <button
                    onClick={() => setshowDialogueBox(false)}
                    className="mt-4 text-sm text-red-600 font-semibold cursor-pointer
              transition-transform duration-300 hover:scale-140 "
                    type="button"
                  >
                    Close
                  </button>

                  <button
                    type='submit'
                    className="mt-4 text-sm text-red-600 font-semibold cursor-pointer
              transition-transform duration-300 hover:scale-140"
                  >
                    Send
                  </button>
                </div>
              </form>
            </StyledWrapper>
          </div>
        )
      }

      <div className="h-52 flex flex-col bg-amber-50 justify-center items-center rounded-t-xl">
        <img className='h-full w-full object-fill rounded-t-xl' src={imageUrl} alt="error" srcSet="" />

      </div>
      <div className="p-4 md:p-6">
        <h3 className="block mb-1 font-semibold uppercase text-rose-600 dark:text-rose-500">
          {name}
        </h3>

        <p className="mt-3  text-gray-500 dark:text-neutral-500">
          {description}
        </p>
        <h6 className="mt-3 text-white">
          {message}
        </h6>
      </div>
      <div className="mt-auto flex border-t  border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">


        <button className="cursor-pointer w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" type='button' onClick={() => { setshowOwner(!showOwner) }}>

          <span className='transition-transform duration-300 hover:scale-110 '>
            Owner Details
          </span>




        </button>
      </div>
    </div>
  )
}

export default ProductL
