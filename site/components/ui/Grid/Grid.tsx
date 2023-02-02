import cn from 'clsx'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import { ProductCard } from '@components/product'
import styles from './styles.module.scss'

interface GridProps {
  className?: string
  products?: Product[]
}

const Grid: FC<GridProps> = ({ className, products = [] }) => {
  const rootClassName = cn(
    styles.main,
    {
      [styles.three]: products.length === 3,
      [styles.two]: products.length === 2,
      [styles.one]: products.length === 1,
    },
    className
  )

  return (
    <div className={rootClassName}>
      {products.map((product: any, i: number) => (
        <ProductCard
          key={product.id}
          product={product}
          imgProps={{
            alt: product.name,
            width: i === 0 ? 1080 : 540,
            height: i === 0 ? 1080 : 540,
            priority: true,
          }}
        />
      ))}
    </div>
  )
}

export default Grid
