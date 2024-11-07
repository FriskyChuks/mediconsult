import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../AxiosInstance';

const MessagingComponent = ({ baseURL, usersList }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate()
    const {id} = useParams()
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('access_token')

    if(email === null){                       
        navigate('/login')
    } 

    const chatPartner = parseInt(id)
    const currentUser = localStorage.getItem('user_id')

    const getUser = usersList.filter(user => user.id === chatPartner)[0]
    
    // Fetch messages initially and on a regular interval
    useEffect(() => {
        const fetchMessages = () => {
            api.get(`${baseURL}/consultations/get_receiver/${currentUser}/${chatPartner}/`,{
                headers:{ "Authorization": `FRISKY ${token}`}
            })
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => console.log(error));
        };

        fetchMessages(); // Fetch messages when component mounts

        const intervalId = setInterval(fetchMessages, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [chatPartner]);

    const sendMessage = (e) => {
        e.preventDefault()
        api.post(`${baseURL}/consultations/`, {
            sender:currentUser,
            receiver: chatPartner,
            content: newMessage,
        },{
            headers:{ "Authorization": `FRISKY ${token}`}
        }).then(response => {
            setMessages([...messages, response.data]);
            setNewMessage('');
        }).catch(error => console.log(error));
    };

    useEffect(() => {
        const chatWindow = document.querySelector('.chat-messages');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, [messages]);

    return (
        <>
            <br /><br /><br />
            <div className='chat-container'> 
                <div className="chat-list">
                    <h4>Chat List</h4>
                </div>
                <div className="chat-window">
                    <div className="chat-header">
                        Consultation with {getUser.firstname} {getUser.lastname}
                        <span style={{float:"right"}}>
                            <Link to={`/prescribe/${getUser.id}`}> 
                                <button className='btn btn-primary'>Raise Prescription</button>
                            </Link>
                        </span>
                    </div>
                    <div className="chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${parseInt(msg.sender) === parseInt(currentUser) ? 'text-right' : 'text-left'}`}>
                                <p>
                                    <span>
                                        <p>{
                                            msg.content}
                                            <span style={{fontSize:"x-small", textIndent:"1em"}}>
                                                {new Date(msg.timestamp).toLocaleTimeString()}
                                            </span>
                                        </p>
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                    <form action="" className='chat-input'>
                        <input 
                            type="text" 
                            value={newMessage} 
                            onChange={e => setNewMessage(e.target.value)} 
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </form>
                    <br /><br />
                </div>
                <div className="chat-list">
                    <h4>Bio of ChatPartner</h4>
                </div>
            </div>
        </>
    );
}

export default MessagingComponent;
