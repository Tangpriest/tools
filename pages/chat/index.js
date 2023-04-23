/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import { ask } from "@/utils/chatgpt";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';
import styles from './Chat.module.css';
import Intro from './components/view';

function ChatHistory({ chatHistory }) {

  const listRef = useRef(null);

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [chatHistory]);

  const getBlockStyle = (user) => {
    if (user === "Q") {
      return "question_block"
    } else {
      return "answer_block"
    }
  }
  return (
    <div className={styles.block} ref={listRef}>
      {chatHistory.map((item, index) => (

        <div className={`${styles.blockItem} ${styles[getBlockStyle(item.user)]}`} key={index}>
          <Image src={item.user === 'Q' ? '/boss.png' : '/bot.png'} width={50} height={50} alt="" className={styles.avatar} />
          <ReactMarkdown className={styles.markdown}>
            {item.text}
          </ReactMarkdown>
        </div>


      ))}
    </div>
  );
}

function ChatInput({ inputValue, setInputValue, handleSend }) {

  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => {
    setIsComposing(true);
  }

  const handleCompositionEnd = () => {
    setIsComposing(false);
  }

  const handleKeyDown = (event) => {
    if (isComposing && event.code === 'Enter') {
      event.preventDefault();
    } else if (event.code === 'Enter') {
      handleSend();
    }
  }


  return (
    <div className={styles['fixed-bottom']}>
      <input
        className={styles.chatInput}
        onKeyDown={handleKeyDown}
        value={inputValue}
        placeholder="Send a message..."
        onChange={(e) => setInputValue(e.target.value)}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <Image src={require('./send.svg')} width={24} height={24} alt="" className={styles.icon} onClick={handleSend} />
    </div>
  );
}

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [showIntro, setShowIntro] = useState(true);


  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

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
      <Intro showIntro={showIntro}/>
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
      />
    </div>
  );
}
