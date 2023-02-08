import { FC, useEffect, useState } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import styles from './styles.module.scss'
import Image, { ImageProps } from 'next/image'
import { Photo } from '@components/common/Cutouts'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'
import ProductSidebar from '../ProductSidebar'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({ product, imgProps, className }) => {
  const [hover, setHover] = useState(false)
  const [counter, setCounter] = useState(0)

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    styles.root,
    {
      [styles.hover]: hover,
    },
    className
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => {
        const next = c + 1
        if (next > product?.images.length) {
          return 0
        }
        return next
      })
    }, 1500)
    if (!hover && counter > 0) {
      // clear the timeout if the mouse leaves
      setCounter(0)
    }
    return () => clearInterval(interval)
  }, [counter, hover, product?.images.length])

  const index = counter % product?.images.length
  const item = product?.images[index]

  return (
    <Link
      href={`/product/${product.slug}`}
      className={rootClassName}
      aria-label={product.name}
      onMouseEnter={() => {
        setHover(true)
        if (product?.images.length > 1) setCounter(1)
      }}
      onMouseLeave={() => setHover(false)}
    >
      {process.env.COMMERCE_WISHLIST_ENABLED && (
        <WishlistButton
          className={styles.wishlistButton}
          productId={product.id}
          variant={product.variants[0] as any}
        />
      )}
      <ProductTag
        name={product.name}
        price={`${price} ${product.price?.currencyCode}`}
      />
      {/* {hover && (
        <ProductSidebar
          key={product.id}
          product={product}
          // className={s.sidebar}
        />
      )} */}
      <div className={styles.productImage}>
        {product?.images && (
          <Photo
            src={item.url || placeholderImg}
            alt={product.name || 'Product Image'}
          />
        )}
      </div>
    </Link>
  )
}

export default ProductCard
