import axios from 'axios';
import { Notecontext } from '../ContextAPI/Notestate';
import styled from 'styled-components';
import { useContext } from 'react';




const Itemresolve = ({ message = "no message is given", resolvingUsername = "Unknown", myphoto, itemId, resolvingEmail, resolverEmail, id, getItem }) => {

const URL = "https://lostandfound-backend-mrbb.onrender.com"


  const { getData } = useContext(Notecontext);

  // const allowResolution = (itemID)=>{
  //   try {

  //     const doctomove = await itemmodels
  //   } catch (error) {

  //   }
  // }


  const movetodocument = async () => {

     try {
      const resolverusername = localStorage.getItem("username");
      const resolvingusername = resolvingUsername;
      const itemid = itemId;
      const resolvingemail = resolvingEmail;
      const resolveremail = resolverEmail;
            const type = "allow";

      const res = await axios.post(`${URL}/resolving/creatediscardedResolution`, { resolverusername, resolvingusername, itemid,resolvingemail,resolveremail,type });

console.log(res);

    } catch (error) {
      console.log(error);

    }



    const selectedId = itemId;
    const ResolvingEmail = resolvingEmail;
    const ResolverEmail = resolverEmail;
    const ResolvingUsername = resolvingUsername;
    const notificationId = id;
    try {
      const response = await axios.post(`${URL}/movingitem`, { ResolvingUsername, selectedId, ResolvingEmail, ResolverEmail, notificationId });
      // console.log(response.data);
      alert("Resolved SuccessFull")
      getItem();
      getData();
    } catch (error) {
      alert("Not found that item or the notification message is not found something");
      console.error(error);
    }






  }

  const DontAllow = async () => {

    try {

      const notificationId = id;
      const response = await axios.post(`${URL}/resolving/discardResolvingItem`, { id: notificationId });
      getItem();
      alert("Resolving Permission Discarded");
      // console.log(response);

    } catch (error) {
      alert("Error finding Message to Delete");
      console.error(error);
    }

console.log("Reached after first try-catch block");

    try {
      console.log("yaha aarha hai");

      const resolverusername = localStorage.getItem("username");
      const resolvingusername = resolvingUsername;
      const itemid = itemId;
      const resolvingemail = resolvingEmail;
      const resolveremail = resolverEmail;
            const type = "dontallow";

      const res = await axios.post(`${URL}/creatediscardedResolution`, { resolverusername, resolvingusername, itemid,resolvingemail,resolveremail,type });
      console.log("kya hua create karne ke baad",res);

    } catch (error) {
      console.log(error);

    }
  }


  return (
    <div className=" card-wrapper h-full">
      <StyledWrapper>
        <div className="notificationCard ">
          <p className="notificationHeading">Resolving Notifications</p>

          {myphoto ? (
            <img className="userPhoto  h-2" src={myphoto} alt="User Photo" />
          ) : (
            <svg className="bellIcon" viewBox="0 0 448 512">
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
            </svg>
          )}

          <p className="notificationPara-name">Name : {resolvingUsername}</p>
          <p className="notificationPara">{message}</p>
          <div className="buttonContainer">
            <button onClick={movetodocument} className="AllowBtn">Allow</button>
            <button onClick={DontAllow} className="NotnowBtn">Don't Allow</button>
          </div>
        </div>
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.div`
  .notificationCard {
    width: 220px;
    background: rgb(245, 245, 245);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 15px;
    gap: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.123);
    border-radius: 20px;
    object-fit: cover;
    min-height: 320px;
    height: 100%; /* Add this line */
  }

  .userPhoto {
    width: 90px;
    height:80px;
    border-radius: 10%;
    object-fit: cover;
    object-position: top center; /* Add this line */
    margin: 10px 0px;
    border: 2px solid rgb(168, 131, 255);
  }


  .bellIcon {
    width: 50px;
    margin: 20px 0px;
  }

  .bellIcon path {
    fill: rgb(168, 131, 255);
  }

  .notificationHeading {
    color: black;
    font-weight: 600;
    font-size: 0.8em;
  }

  .notificationPara {
    color: rgb(133, 133, 133);
    font-size: 0.6em;
    font-weight: 600;
    text-align: center;
  }
    .notificationPara-name{
    color: black;
    font-size:0.9rem;
    }

  .buttonContainer {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .AllowBtn {
    width: 120px;
    height: 25px;
    background-color: rgb(168, 131, 255);
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 0.7em;
    font-weight: 600;
    cursor: pointer;
  }

  .NotnowBtn {
    width: 120px;
    height: 25px;
    color: rgb(168, 131, 255);
    border: none;
    background-color: transparent;
    font-weight: 600;
    font-size: 0.7em;
    cursor: pointer;
    border-radius: 20px;
  }

  .NotnowBtn:hover {
    background-color: rgb(239, 227, 255);
  }

  .AllowBtn:hover {
    background-color: rgb(153, 110, 255);
  }`;

export default Itemresolve;
