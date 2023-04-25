import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './ChatList.module.css'

export default function ChatList() {

  const router = useRouter()

  const [chatList, setChatList] = useState([])

  const [currentChat, setCurrentChat] = useState(null)

  const mockChatList = [
    // {
    //   id : 1,
    //   title: 'ChatGPT',
    //   description: 'Hello, how are you?',
    //   conversation: [
    //     {
    //       Q: 'Hello, how are you?',
    //       A: 'I am fine, thank you. And you?'
    //     },
    //     {
    //       Q: 'Hello, how are you?',
    //       A: 'I am fine, thank you. And you?'
    //     }
    //   ]
    // },
    // {
    //   id : 2,
    //   title: '计算两个数的和',
    //   description: '你能帮我计算吗?',
    //   conversation: [
    //     {
    //       Q: 'Hello, how are you?',
    //       A: 'I am fine, thank you. And you?'
    //     },
    //     {
    //       Q: 'Hello, how are you?',
    //       A: 'I am fine, thank you. And you?'
    //     }
    //   ]
    // }
  ]

  useEffect(() => {

    if (router.query.pid) {
      setCurrentChat(router.query.pid)



      if (router.query.pid === 'new') {

        
      }
      setChatList([
            {
              id : 'new',
              title: 'New Chat',
              description: 'To Be Answered',
            }
      ])
    }

  }, [router])


  return (
    <div className={styles.chatList}>
      {
        chatList.map((item, index) => {
          return (
            <div className={styles.ChatListItem} key={index} onClick={() => {
              setCurrentChat(item.title)
              router.push(`/chat/${item.id}`)
            }}
              style={{
                backgroundColor: currentChat === item.id ? 'var(--primary-color-light)' : ''
              }}>
              {/* <Image src="/assets/member.svg" alt="Nextjs" width={50} height={50} /> */}
              <div className={styles.ChatListItemContent}>
                <div className={styles.ChatListItemContentTitle}>
                  {item.title}
                </div>
                <div className={styles.ChatListItemContentText}>
                  {item.description}
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}