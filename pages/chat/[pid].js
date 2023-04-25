import Navigator from "../components/Navigator"
import ChatComponent from './components/Conversation/index'
import ChatList from './components/List/ChatList'

export default function Chat({ setIsLoading,setIsLoginVisible,userInfo }) {
  return (
    <div className='pageContainer'>
      <Navigator setIsLoginVisible={setIsLoginVisible} userInfo={userInfo}/>
      <div className='pageMain'>
        <div style={{
          width : '100%',
          height : '100%',
          display : 'flex',
        }}>
          <ChatList />
          <ChatComponent setIsLoading={setIsLoading} />

        </div>
      </div>
    </div>
  )
}