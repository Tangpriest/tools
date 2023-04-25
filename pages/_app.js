import { useState } from "react";
import '../styles/globals.css';
import LoginDialog from "./components/Login";
import RobotLoading from "./components/RobotLoading";


function App({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null)

  return (
    <>
      <RobotLoading isLoading={isLoading} />
      <LoginDialog visible={isLoginVisible} onClose={() => setIsLoginVisible(false)} setUserInfo={setUserInfo}/>
      <Component {...pageProps}
        setIsLoading={setIsLoading}
        setIsLoginVisible={setIsLoginVisible}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </>
  )
}

export default App;
