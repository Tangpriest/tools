import { useRouter } from "next/router";
import { useState } from "react";
import '../styles/globals.css';
import RobotLoading from "./components/robot-loading";


function App({ Component, pageProps }) {

  const router = useRouter

  const [isLoading, setIsLoading] = useState(false);




  return (
    <>
      <RobotLoading isLoading={isLoading} />
      <Component {...pageProps} setIsLoading={setIsLoading}/>
    </>
  )
}

export default App;
