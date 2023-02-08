import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.scss'

import NavbarRoot from './NavbarRoot'
import { Logo } from '@components/ui'
import { UserNav } from '@components/common'

interface Link {
  href: string
  label: string
}

const Navbar = () => (
  <NavbarRoot>
    <div className={styles.main}>
      {/* Texture */}
      <div className={`${styles.tear} ${styles.bottom}`}>
        <Image src="/textures/paper/ripped-7.png" alt={'paper texture'} fill />
      </div>

      {/* Nav bar */}
      <div className={styles.content}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>

          {/* <h5>Drop 001</h5> */}
        </div>
        <div className={styles.title}>
          <h4>LOADED</h4>
        </div>
        <UserNav />
      </div>
    </div>
  </NavbarRoot>
)

export default Navbar
