import Navigator from "../components/Navigator"
import ChatComponent from './components/Conversation/index'
import ChatList from './components/List/ChatList'

export default function Chat({ setIsLoading }) {
  return (
    <div className='pageContainer'>
      <Navigator />
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