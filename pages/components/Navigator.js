import Image from "next/image"
import { useRouter } from "next/router"
import styles from '../../styles/Home.module.css'

export default function Navigator() {

  const menus = [
    {
      key: 'chat',
      page : 'chat/new',
      icon: '/assets/chat.svg',
      name: 'Chat'
    },
    {
      key: 'settings',
      page : 'settings',
      icon: '/assets/settings.svg',
      name: 'Settings'
    },
    {
      key: 'account',
      page : 'account',
      icon: '/assets/account.svg',
      name: 'Account'
    }
  ]

  const router = useRouter()
  const { pathname, query } = router
  
  return (
    <div className={styles.menu}>
      <div className={styles.logo}>CH</div>
      <div className={styles.menus}>
        {
          menus.map((menu, index) => (
            <div className={styles.menuItem} key={index} onClick={() => router.push(`/${menu.page}`)} style={{
              backgroundColor: pathname && pathname.indexOf(`/${menu.key}`) > -1 ? 'var(--secondary-color)' : ''
            }}>
              <Image src={menu.icon} width={30} height={30} alt='robot' />
              <div>{menu.name}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}