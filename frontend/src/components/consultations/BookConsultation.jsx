import { useState, useEffect } from 'react';

const users = [
  { id: 1, name: 'Frisky Chuks' },
  { id: 2, name: 'Smooth Tee' },
];

const BookConsultation = ({ usersList }) => {
  const [activeChat, setActiveChat] = useState(users[0]);
  const [messages, setMessages] = useState({
    1: [],
    2: [],
  });
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Retrieve messages from localStorage when the component mounts
    const storedMessages = JSON.parse(localStorage.getItem('messages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const timestamp = formatTime(new Date());
    const messageData = {
      text: newMessage,
      senderId: activeChat.id,
      senderName: activeChat.email,
      time: timestamp,
    };

    const updatedMessages = {
      ...messages,
      [activeChat.id]: [...messages[activeChat.id], messageData],
    };

    // Update state
    setMessages(updatedMessages);

    // Store the updated messages in localStorage
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    // Clear the input field
    setNewMessage('');
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-list">
          {users.map((user) => (
            <div
              key={user.id}
              className={`chat-list-item ${
                activeChat.id === user.id ? 'active' : ''
              }`}
              onClick={() => setActiveChat(user)}
            >
              {user.email}
            </div>
          ))}
        </div>
        <div className="chat-window">
          <div className="chat-header">Consultation with {activeChat.email}</div>
          <div className="chat-messages">
            {messages[activeChat.id].map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.senderId === activeChat.id ? 'sent' : 'received'
                }`}
              >
                <div>
                  <strong>{msg.senderName}:</strong> {msg.text}
                </div>
                <div className="timestamp">{msg.time}</div>
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </form>
        </div>
      </div>
      <br />
    </>
  );
};

export default BookConsultation;
