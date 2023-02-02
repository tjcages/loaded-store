import Image from 'next/image'
import styles from './styles.module.scss'

const Logo = ({ className = '', ...props }) => (
  <Image
    className={styles.main}
    src="/icon-512x512.png"
    alt="logo"
    width={48}
    height={48}
    {...props}
  />
)

export default Logo
