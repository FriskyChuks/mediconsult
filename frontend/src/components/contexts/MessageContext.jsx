import { createContext, useState, useContext } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [messageType, setMessageType] = useState('info'); 

  const showMessage = (text, type = 'info') => { 
    setMessage(text);
    setMessageType(type);
    setShowModal(true);
  };

  const hideMessage = () => {
    setShowModal(false);
    setMessage('');
    setMessageType('info');
  };

  return (
    <MessageContext.Provider value={{ message, showModal, messageType, showMessage, hideMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
