import { ask } from "@/utils/chatgpt";
import { useEffect, useState } from "react";
import styles from './Chat.module.css';
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import ChatbotIntro from "./components/intro";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showIntro, setShowIntro] = useState(true);


  const handleSend = async () => {
    const newChatHistory = [...chatHistory, { text: inputValue, user: "Q" }];
    setChatHistory(newChatHistory);
    setInputValue("")
    setShowIntro(false)
  };

  const handleAsk = async () => {
    
    const prompt = chatHistory
      .map((item) => `${item.user}: ${item.text}`)
      .join("\n");
    const response = await ask(prompt);
    const answer = response.split("A:").pop();

    console.log(answer)
    const newChatHistory = [...chatHistory, { text: answer, user: "A" }];
    setChatHistory(newChatHistory);
  };

  useEffect(() => {
    const lastChat = [...chatHistory].pop()
    if (lastChat && lastChat.user === "Q") {
      handleAsk();
    }
  }, [chatHistory]);

  return (
    <div className={`${styles.container}`} style={{
      backgroundColor : showIntro ? '#000' : "var(--primary-color)" 
    }}>
      <ChatbotIntro showIntro={showIntro}/>
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
      />
    </div>
  );
}
