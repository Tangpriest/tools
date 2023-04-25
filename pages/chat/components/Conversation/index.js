import { ask } from "@/utils/chatgpt";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import ChatbotIntro from "./ChatbotIntro";
import styles from './index.module.css';

export default function Chat({ setIsLoading }) {

  const router = useRouter()


  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showIntro, setShowIntro] = useState(true);


  const handleSend = async () => {
    const newChatHistory = [...chatHistory, { text: inputValue, user: "Q" }];
    setChatHistory(newChatHistory);
    setInputValue("")
    setShowIntro(false)
  };

  /**
   * get user settings from localstorage
   * @returns 
   */
  const getUserSettings = () => {
    const userSettings = JSON.parse(window.localStorage.getItem('userSettings')) || {
      presetValue: "",
      temperature: 50,
      top_p: 50,
      frequency_penalty: 50,
      presence_penalty: 50
    }

    return ({
      presetValue : userSettings.presetValue || '',
      settings :  {
        temperature : userSettings.temperature / 100,
        top_p : userSettings.top_p / 100,
        frequency_penalty : userSettings.frequency_penalty / 100,
        presence_penalty : userSettings.presence_penalty / 100
      }
    })
  }

 
  const handleAsk = async () => {
    setIsLoading(true)

    let prompt = chatHistory
      .map((item) => `${item.user}: ${item.text}`)
      .join("\n");


    const {presetValue,settings} = getUserSettings()

    if(presetValue){
      prompt = `
      Q : ${presetValue}
      A : 我知道了。
      ${prompt}
      `
    }
    const response = await ask(prompt,settings);
    setIsLoading(false)
    const answer = response.split("A:").pop();

    const newChatHistory = [...chatHistory, { text: answer, user: "A", render: true }];
    setChatHistory(newChatHistory);
  };

  useEffect(() => {
    const lastChat = [...chatHistory].pop()
    if (lastChat && lastChat.user === "Q") {
      handleAsk();
    }
  }, [chatHistory]);


  useEffect(() => {
    const data =
    {
      id: 2,
      title: '计算两个数的和',
      description: '你能帮我计算吗?',
      conversation: [
        {
          user: 'Q',
          text: 'Hello, how are you?',

        },
        {
          user: 'A',
          text: 'Hello, how are you?',
        }
      ]
    }

    if (router.query.pid == 2) {
      setChatHistory(data.conversation)
      setShowIntro(false)
    }


  }, [router])

  return (
    <div className={`${styles.container}`}>
      <ChatbotIntro showIntro={showIntro} />
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
      />
    </div>
  );
}
