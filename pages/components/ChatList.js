import Image from 'next/image'
import styles from './ChatList.module.css'

export default function ChatList(){

  const list = new Array(100).fill(0)
  return (
    <div className={styles.chatList}>
      {
        list.map( (item,index) => {
          return (
            <div className={styles.ChatListItem} key={index}>
            <Image src="/assets/member.svg" alt="Nextjs" width={50} height={50} />
            <div className={styles.ChatListItemContent}>
              <div className={styles.ChatListItemContentTitle}>
                ChatGPT
              </div>
              <div className={styles.ChatListItemContentText}>
                Hello, how are you?
              </div>
            </div>
          </div>
          )
        })
      }
     
    </div>
  )
}