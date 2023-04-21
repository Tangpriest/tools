/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import { ask } from "@/utils/chatgpt";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import ReactMarkdown from 'react-markdown';
import styles from './Chat.module.css';

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
          <Image src={item.user === 'Q' ? '/boss.png' : '/bot.png'} width={50} height={50} alt="" className={styles.avatar}/>
          <ReactMarkdown className={styles.markdown}>
               {item.text}
           </ReactMarkdown>
        </div>

        
      ))}
    </div>
  );
}

function ChatInput({ inputValue, setInputValue, handleSend }) {

 
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Container className={`mt-5 ${styles['fixed-bottom']}`}>
      <Row>
        <Col>
          <InputGroup>
            <FormControl
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              aria-label="Type your message here..."
            />
            <Button variant="primary" onClick={handleSend}>
              Send
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    const newChatHistory = [...chatHistory, { text: inputValue, user: "Q" }];
    setChatHistory(newChatHistory);
    setInputValue("")
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
    <div className={`${styles.container}`}>
      {/* <h1 className="text-center mt-5" style={{color:'#f5f5f5'}}>ChatGPT</h1> */}
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
      />
    </div>
  );
}
