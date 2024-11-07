// ActivationPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../AxiosInstance';

import { useMessage } from "../contexts/MessageContext";

const ActivationPage = ({ baseURL }) => {
  const { uid, token } = useParams();
  const navigate = useNavigate()
  const [msg, setMsg] = useState('Activating your account... WAIT for it!')
  const { showMessage } = useMessage();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await api.post(`${baseURL}/auth/users/activation/`, {
          uid,
          token
        });
        showMessage('Account Activated Successfully, Login to continue', 'success')
        navigate('/login')
      } catch (error) {
        showMessage('Error Activating your account, please try again:', 'error')
        // console.error('Activation error:', error);
      }
    };

    activateAccount();
  }, [uid, token]);

  return (
    <div className='text-center'>
      <br />
      <h1>{msg}</h1>
      <br /><br />
    </div>
  );
};

export default ActivationPage;
