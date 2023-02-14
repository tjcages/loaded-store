import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Grid, Marquee } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import type { Product } from '@commerce/types/product'

import { Grid as Magazine } from '../components/common/Cutouts'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 10 },
    config,
    preview: false,
  })
  const productPromise = (slug: string = '') =>
    commerce.getProduct({
      variables: { slug: slug },
      config,
      preview,
    })

  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })

  // get preview of all products
  const { products } = await productsPromise
  // get full product data for each product
  const fullProductsPromise = products.map(async (previewProduct) => {
    const { product } = await productPromise(previewProduct.slug)
    return product
  }) as Promise<Product>[]

  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  const fullProducts: Product[] = await Promise.all(fullProductsPromise)

  return {
    props: {
      products: fullProducts,
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
      <Grid products={products.slice(4, 6)} />
      <Grid products={products.slice(0, 3)} />

      <Marquee />

      <Grid products={products.slice(0, 2)} />
      <Grid products={products.slice(3, 6)} />

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

      <Marquee />
    </section>
  )
}

Home.Layout = Layout
