import styles from './styles.module.scss'

import { Text } from '@components/common/Cutouts'

interface ProductTagProps {
  name: string
  price: string
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}

const ProductTag: React.FC<ProductTagProps> = ({ name, price, position }) => {
  return (
    <div
      className={styles.main}
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
    >
      <Text text={price} />
      <Text text={name} large />
    </div>
  )
}

export default ProductTag
