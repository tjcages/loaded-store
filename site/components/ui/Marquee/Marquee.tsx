import { FC, ReactNode, Component, Children } from 'react'
import Image from 'next/image'
import { default as FastMarquee } from 'react-fast-marquee'
import type { Product } from '@commerce/types/product'
import { Photo } from '@components/common/Cutouts'
import styles from './styles.module.scss'

import { useRandomize } from '../../../hooks/random'

const placeholderImg = '/product-img-placeholder.svg'

interface Props {
  products?: Product[]
}

const Marquee: FC<Props> = ({ products }) => {
  const top = useRandomize(1, 9)
  const bottom = useRandomize(1, 9)

  return (
    <div className={styles.main}>
      <div className={styles.tear}>
        <Image
          className={styles.image}
          src={`/textures/paper/ripped-${top}.png`}
          alt={'paper texture'}
          fill
        />
      </div>
      <FastMarquee gradient={false} className={styles.marquee}>
        <h1>LOADED –– DROP 001 –– </h1>
        <div className={styles.products}>
          {products &&
            products.slice(0, Math.floor(products.length / 2)).map(
              (product, index: number) =>
                product?.images && (
                  <div key={index} className={styles.product}>
                    <Photo
                      src={product.images[0]?.url || placeholderImg}
                      alt={product.name || 'Product Image'}
                    />
                  </div>
                )
            )}
        </div>
        <h1>LOADED –– SPORTING GOODS –– </h1>
        <div className={styles.products}>
          {products &&
            products
              .slice(Math.floor(products.length / 2) + 1, products.length - 1)
              .map(
                (product, index: number) =>
                  product?.images && (
                    <div key={index} className={styles.product}>
                      <Photo
                        src={product.images[0]?.url || placeholderImg}
                        alt={product.name || 'Product Image'}
                      />
                    </div>
                  )
              )}
        </div>
      </FastMarquee>
      <div className={`${styles.tear} ${styles.bottom}`}>
        <Image
          className={styles.image}
          src={`/textures/paper/ripped-${bottom}.png`}
          alt={'paper texture'}
          fill
        />
      </div>
    </div>
  )
}

export default Marquee
