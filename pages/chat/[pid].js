import ChatList from '../components/ChatList'
import Navigator from "../components/Navigator"
import ChatComponent from '../components/chatv1/index'

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