import style from './style.module.scss'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { useUI } from '@components/ui'
import { Container, Button } from '@components/common/Cutouts'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ErrorMessage from '@components/ui/ErrorMessage'

interface QuickBuyProps {
  product: Product
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}

const QuickBuy: FC<QuickBuyProps> = ({ product, position }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    setError(null)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err instanceof Error) {
        console.error(err)
        setError({
          ...err,
          message: 'Could not add item to cart. Please try again.',
        })
      }
    }
  }

  return (
    <div
      className={style.main}
      style={{
        left: position == 'topLeft' || position == 'bottomLeft' ? '0' : 'auto',
        right:
          position == 'topRight' || position == 'bottomRight' ? '0' : 'auto',
        top: position == 'topLeft' || position == 'topRight' ? '0' : 'auto',
        bottom:
          position == 'bottomLeft' || position == 'bottomRight' ? '0' : 'auto',
        justifyContent:
          position == 'topLeft' || position == 'bottomLeft'
            ? 'flex-start'
            : 'flex-end',
      }}
      onClick={(e) => e.preventDefault()}
    >
      {product.options && product.options.length > 0 && (
        <Container>
          <ProductOptions
            options={product.options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          {error && <ErrorMessage error={error} className="my-5" />}
        </Container>
      )}
      {process.env.COMMERCE_CART_ENABLED && (
        <Button
          invert
          text={'Add to Cart'}
          onClick={addToCart}
          disabled={variant?.availableForSale === false}
          className={style.button}
        />
      )}
    </div>
  )
}

export default QuickBuy
