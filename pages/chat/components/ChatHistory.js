import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';
import styles from '../Chat.module.css';



function TypingEffect({ text }) {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let timeoutId;
    let i = 0;

    const addChar = () => {

      setCurrentText((prevText) => prevText + text[i]);
      i++;

      if (i < text.length-1) {
        timeoutId = setTimeout(addChar, 100);
      }
    };

    timeoutId = setTimeout(addChar, 100 * Math.random());

    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <ReactMarkdown className={styles.markdown}>
      {currentText}
    </ReactMarkdown>
  );
}

export default function ChatHistory({ chatHistory }) {
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

  useEffect(() => {
    const isAnswer = [...chatHistory].pop()?.user === 'A'

    if (isAnswer) {
      console.log(`收到回答`)
    }
  }, [chatHistory])

  return (
    <div className={styles.block} ref={listRef}>
      {chatHistory.map((item, index) => {
        if (index !== chatHistory.length - 1 || item.user === 'Q') {
          return (
            <div className={`${styles.blockItem} ${styles[getBlockStyle(item.user)]}`} key={index}>
              <Image src={item.user === 'Q' ? '/assets/boss.png' : '/assets/bot.png'} width={50} height={50} alt="" className={styles.avatar} />
              <ReactMarkdown className={styles.markdown}>
                {item.text}
              </ReactMarkdown>
            </div>
          )
        } else {
          return (

            <div className={`${styles.blockItem} ${styles[getBlockStyle(item.user)]}`} key={index}>
              <Image src={item.user === 'Q' ? '/assets/boss.png' : '/assets/bot.png'} width={50} height={50} alt="" className={styles.avatar} />
              <TypingEffect text={item.text} />
            </div>
          )
        }
      })}
    </div>
  );
}
