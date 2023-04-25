import { ask } from "@/utils/chatgpt";
import { useEffect, useState } from "react";
import styles from './Chat.module.css';
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import ChatbotIntro from "./components/ChatbotIntro";

export default function Chat({ setIsLoading }) {


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
    setIsLoading(true)

    const prompt = chatHistory
      .map((item) => `${item.user}: ${item.text}`)
      .join("\n");
    const response = await ask(prompt);
    setIsLoading(false)
    const answer = response.split("A:").pop();

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
      backgroundColor: showIntro ? '#000' : "var(--secondary-color)",
    }}>
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
