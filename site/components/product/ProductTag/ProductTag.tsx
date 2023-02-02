import styles from './styles.module.scss'
import { useRandomize, useRandom } from '../../../hooks/random'

import { Text } from '@components/common/Cutouts'

interface ProductTagProps {
  name: string
  price: string
}

const ProductTag: React.FC<ProductTagProps> = ({ name, price }) => {
  const left = useRandomize(0, 1)
  const top = useRandom(0, 1)

  return (
    <div
      className={styles.main}
      style={{
        left: left == 1 ? '0' : 'auto',
        right: left == 0 ? '0' : 'auto',
        top: top == 1 ? '0' : 'auto',
        bottom: top == 0 ? '0' : 'auto',
        justifyContent: left == 1 ? 'flex-start' : 'flex-end',
      }}
    >
      <Text text={price} />
      <Text text={name} large />
    </div>
  )
}

export default ProductTag
