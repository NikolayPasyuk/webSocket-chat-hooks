import './App.css';
import {useEffect, useRef, useState} from "react";

function App() {

    const messagesBlockRef = useRef()
    const [messageText, setMessageText] = useState('')
    const [ws, setWs] = useState(null)
    const [users, setUsers] = useState([])

    if (ws) {
        ws.onmessage = (messageEvent) => {
            let messages = JSON.parse(messageEvent.data)
            console.log(messageEvent)
            setUsers([...users, ...messages])
            messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight);
        };
    }

    useEffect(() => {
        let localWs = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        setWs(localWs)
    }, [])

    const onMessageChange = (e) => {
        setMessageText(e.currentTarget.value)
    }

    const sendMessage = () => {
        ws.send(messageText)
        setMessageText('')
    }

    return (
        <div className="App">
            <div className='chat'>
                <div className='messages' ref={messagesBlockRef}>
                    {users.map((u, index) => <div className='message' key={index}>
                        <img src={u.photo}/> <b>{u.userName}</b> <span>{u.message}</span>
                    </div>)}
                </div>
                <div className='footer'>
                    <textarea onChange={onMessageChange} value={messageText}/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>

        </div>
    );
}

export default App;
