import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import styles from './styles.module.scss'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Drops',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(styles.root, className)

  return (
    <section className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link
              href="/"
              className="flex flex-initial items-center font-bold md:mr-24"
            >
              <Logo className="mr-2" />
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-7">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link
                    href={page.url!}
                    className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150"
                  >
                    {page.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3 flex items-start lg:justify-end text-primary">
            <div className="flex space-x-4 items-center h-10">
              {/* <ThemeSwitcher /> */}
              <I18nWidget />
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>&copy; 2023 LOADED, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center text-primary text-sm">
            <h5 className="text-primary">LOADED</h5>
          </div>
        </div>
      </Container>
    </section>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
