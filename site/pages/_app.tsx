import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'
import '../styles/globals.css'
import styles from '../styles/_main.module.scss'

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

const scripton = localFont({
  src: '../public/fonts/scripton_regular-webfont.woff2',
})

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <main className={`${scripton.className} ${styles.main}`}>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </main>
  )
}
