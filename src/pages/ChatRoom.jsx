import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessage from '../components/Chat/ChatMessage.jsx';
import Background from '../components/Background.jsx';
import "../css/pages/ChatRoom.css"
const chatMessages = [
    { id: 1, sender: "me", message: "안녕하세요!", time: "10:00" },
    { id: 2, sender: "other", message: "반갑습니다 :)", time: "10:01" },
    { id: 3, sender: "me", message: "오늘 날씨 좋네요", time: "10:02" },
    { id: 4, sender: "other", message: "네! 산책 가고 싶어요", time: "10:03" },
  ];
  
  function ChatRoom() {
    return (
        <div>
            <Background/>
            <ChatHeader nickname="겨울이오길" age="22살" major="정보보안공학부"/>

            <div className="chat-body">
                {
                    chatMessages.map((chat) => (
                        <ChatMessage
                            key={chat.id}
                            sender={chat.sender}
                            message={chat.message}
                            time={chat.time}/>
                    ))
                }
            </div>
        </div>
    );
}

export default ChatRoom;