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

  const handleAsk = async () => {
    setIsLoading(true)

    const prompt = chatHistory
      .map((item) => `${item.user}: ${item.text}`)
      .join("\n");
    const response = await ask(prompt);
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
