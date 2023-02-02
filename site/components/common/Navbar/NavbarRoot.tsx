import { FC, useState, useEffect, ReactNode } from 'react'
import throttle from 'lodash.throttle'
import cn from 'clsx'
import styles from './styles.module.scss'

const NavbarRoot: FC<{ children?: ReactNode }> = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return (
    <section className={cn(styles.root, { 'shadow-magical': hasScrolled })}>
      {children}
    </section>
  )
}

export default NavbarRoot
