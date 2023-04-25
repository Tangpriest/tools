import Navigator from "../components/Navigator"

export default function Chat({ setIsLoginVisible, userInfo }) {
  return (
    <div className='pageContainer'>
      <Navigator setIsLoginVisible={setIsLoginVisible} userInfo={userInfo} />
      <div className='pageMain'>

      </div>
    </div>
  )
}