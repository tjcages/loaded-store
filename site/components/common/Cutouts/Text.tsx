import React, { useEffect, useState, useRef, FC } from 'react'
import Image from 'next/image'
import { cutout } from './cutout'
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

const Text: FC<Props> = ({
  text = 'Coming soon',
  top,
  left,
  right,
  bottom,
  accent,
  invert,
}) => {
  const ref = useRef<HTMLHeadingElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const shape = ref.current
    if (shape) {
      cutout(shape)
    }
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
        ref={ref}
        className={`${styles.cutout} ${accent ? styles.accent : ''} ${
          invert ? styles.invert : ''
        }`}
        style={{
          padding: `${useRandomize(5, 10)}px ${useRandomize(
            20,
            30
          )}px ${useRandomize(0, 5)}px
        ${useRandomize(20, 30)}px`,
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
          maskSize: `${useRandomize(90, 100)}%`,
        }}
      >
        {text}
        <Image
          src={`/textures/plastic/plastic_${useRandomize(1, 12)}.png`}
          alt={'texture'}
          fill
          style={{ opacity: 0.5 }}
        />
      </h5>
    </div>
  )
}

export default Text
