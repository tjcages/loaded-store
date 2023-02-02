import React, { useEffect, useState, FC } from 'react'
import Magazine from './_Magazine'

import styles from './style.module.scss'

interface Props {
  src: string
  float?: boolean
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
}

const Grid: FC<Props> = (props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div
      className={`${styles.main} ${props.float ? styles.float : ''}`}
      style={{
        top: props.top,
        left: props.left,
        right: props.right,
        bottom: props.bottom,
        opacity: isMounted ? 1 : 0,
        perspective: 1000,
      }}
    >
      <Magazine topLeft {...props} />
      <Magazine topRight {...props} />
      <Magazine bottomRight {...props} />
      <Magazine bottomLeft {...props} />
    </div>
  )
}

export default Grid
