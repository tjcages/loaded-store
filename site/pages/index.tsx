import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Grid, Marquee } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { Grid as Magazine } from '../components/common/Cutouts'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <section>
      <Grid products={products.slice(0, 3)} />
      <Grid products={products.slice(4, 6)} />

      <Marquee />

      <Grid products={products.slice(3, 6)} />
      <Grid products={products.slice(0, 2)} />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <Magazine src="/demo/close_7.avif" float top="20%" left="25%" />
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '77%',
            zIndex: 70,
          }}
        >
          <h4>Deadstock</h4>
          <p>by</p>
          <h5>LOADED</h5>
        </div>
      </div>

      <Marquee products={products.slice(0, 4)} />
    </section>
  )
}

Home.Layout = Layout
