/* eslint-disable react-hooks/exhaustive-deps */
import { ask } from "@/utils/chatgpt";
import { useEffect, useState } from "react";
import { Button, Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";

function ChatHistory({ chatHistory }) {
  return (
    <Container className="mt-5">
      {chatHistory.map((item, index) => (
        <Row key={index} className="mb-3">
          <Col sm={2}>{item.user}</Col>
          <Col sm={10}>{item.text}</Col>
        </Row>
      ))}
    </Container>
  );
}

function ChatInput({ inputValue, setInputValue, handleSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Container className="mt-5">
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
    <>
      <h1 className="text-center mt-5">Chat</h1>
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSend={handleSend}
      />
    </>
  );
}
