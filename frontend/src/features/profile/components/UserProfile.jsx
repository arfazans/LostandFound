import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserDetailCard from './UserDetailCard';
import { Layout } from '../../../shared/components/Layout';

const StyledWrapper = styled.div`
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
  .truckBody {
    width: 130px;
    margin-bottom: 6px;
    animation: motion 1s linear infinite;
  }
  @keyframes motion {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(3px); }
  }
  .truckTires {
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 15px;
    position: absolute;
    bottom: 0;
  }
  .road {
    width: 100%;
    height: 1.5px;
    background-color: #282828;
    position: relative;
    bottom: 0;
    border-radius: 3px;
  }
  .lampPost {
    position: absolute;
    bottom: 0;
    right: -90%;
    height: 90px;
    animation: roadAnimation 1.4s linear infinite;
  }
  @keyframes roadAnimation {
    0% { transform: translateX(0px); }
    100% { transform: translateX(-350px); }
  }
`;

function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("email");

  if (isLoggedIn) {
    return (
      <Layout>
        <UserDetailCard />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-center items-center py-20 px-4">
        <StyledWrapper>
          <div className="flex flex-col items-center">
            <div className="truckWrapper">
              <div className="truckBody">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93">
                  <path strokeWidth={3} stroke="#282828" fill="#F83D3D" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z" />
                  <path strokeWidth={3} stroke="#282828" fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z" />
                  <rect strokeWidth={3} stroke="#282828" fill="#DFDFDF" rx="2.5" height={90} width={121} y="1.5" x="6.5" />
                </svg>
              </div>
              <div className="truckTires">
                {[1, 2].map(i => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="w-8">
                    <circle strokeWidth={3} stroke="#282828" fill="#282828" r="13.5" cy={15} cx={15} />
                    <circle fill="#DFDFDF" r={7} cy={15} cx={15} />
                  </svg>
                ))}
              </div>
              <div className="road" />
            </div>
            <h1 className='text-center mt-8 text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight'>Authentication Required</h1>
            <p className="text-gray-500 dark:text-neutral-400 mt-2 text-center max-w-xs font-medium">
              Please sign in to view and manage your reported items and profile.
            </p>
            <div className='mt-10 flex gap-4 w-full sm:w-auto'>
              <button onClick={() => navigate('/login')} className="flex-1 sm:px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black shadow-lg shadow-amber-500/20 transition-all active:scale-95">
                Login
              </button>
              <button onClick={() => navigate('/signup')} className="flex-1 sm:px-10 py-4 bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white rounded-2xl font-black hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all active:scale-95">
                Sign Up
              </button>
            </div>
          </div>
        </StyledWrapper>
      </div>
    </Layout>
  );
}
export default Profile;
