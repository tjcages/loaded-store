import React, { useEffect, useState, FC } from 'react'
import { useRandomize } from '../../../hooks/random'

import styles from './style.module.scss'

interface Props {
  text: string
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  accent?: boolean
  invert?: boolean
}

const Cutout: FC<Props> = ({
  text = 'Coming soon',
  top,
  left,
  right,
  bottom,
  accent,
  invert,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div
      className={styles.main}
      style={{
        top,
        left,
        right,
        bottom,
        opacity: isMounted ? 1 : 0,
        filter: `drop-shadow(
          ${useRandomize(-2, 2)}px ${useRandomize(-2, 4)}px
          ${useRandomize(1, 6)}px rgba(0, 0, 0, ${useRandomize(1, 4) / 10})
        )`,
      }}
    >
      <h5
        className={`${styles.cutout} ${accent ? styles.accent : ''} ${
          invert ? styles.invert : ''
        }`}
        style={{
          padding: `${useRandomize(5, 10)}px ${useRandomize(
            10,
            15
          )}px ${useRandomize(5, 15)}px
        ${useRandomize(10, 20)}px`,
          clipPath: `polygon(${useRandomize(0, 20)}% 0%, 100% ${useRandomize(
            0,
            15
          )}%, ${useRandomize(80, 100)}% ${useRandomize(
            60,
            100
          )}%, 0 ${useRandomize(60, 100)}%, 0 ${useRandomize(0, 40)}%`,
          transform: `rotate3d(${useRandomize(-1, 1)}, ${useRandomize(
            -1,
            1
          )}, 1, ${useRandomize(
            left != null ? (top != null ? -35 : 35) : -2,
            right != null ? (top != null ? 35 : -35) : 2
          )}deg) scale(${
            1 + useRandomize(0, 1) / 10
          }) translate3d(${useRandomize(-1, 1)}px, ${useRandomize(
            -1,
            1
          )}px, ${useRandomize(-1, 1)}px)`,
        }}
      >
        {text}
      </h5>
    </div>
  )
}

export default Cutout
