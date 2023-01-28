import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'
import '../styles/globals.css'

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

// const nueva = localFont({ src: '../public/fonts/NuevaCondensed-Italic.otf' })
const whalebone = localFont({ src: '../public/fonts/Whalebone.otf' })

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <main className={whalebone.className}>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </main>
  )
}
