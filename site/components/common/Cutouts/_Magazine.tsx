import React, { useEffect, useRef, FC } from 'react'
import Image from 'next/image'
import { cutoutGrid } from './cutout'
import { useRandomize, useRandom } from '../../../hooks/random'

import styles from './style.module.scss'

interface Props {
  src: string
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  accent?: boolean
  invert?: boolean
  topLeft?: boolean
  topRight?: boolean
  bottomLeft?: boolean
  bottomRight?: boolean
}

const Magazine: FC<Props> = ({
  src,
  top,
  left,
  right,
  bottom,
  accent,
  invert,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}) => {
  const ref = useRef<HTMLImageElement>(null)
  const edge = useRef<HTMLDivElement>(null)
  const angle = useRandomize(-5, 5)

  let skew = { x: 0, y: 0, z: 0, deg: 0 }
  if (topLeft) {
    skew = { x: 0.1, y: -0.1, z: -1, deg: angle }
  } else if (topRight) {
    skew = { x: 0.1, y: 0.1, z: 1, deg: angle }
  } else if (bottomLeft) {
    skew = { x: 0, y: 0, z: 1, deg: angle }
  } else if (bottomRight) {
    skew = { x: 0.1, y: -0.1, z: -1, deg: angle }
  }

  useEffect(() => {
    const shape = ref.current
    if (shape) {
      cutoutGrid(shape, topLeft, topRight, bottomLeft, bottomRight)
      if (edge.current) {
        edge.current.style.clipPath = shape.style.clipPath
      }
    }
  }, [bottomLeft, bottomRight, topLeft, topRight])

  return (
    <div
      className={styles.magazine}
      style={{
        filter: `drop-shadow(
      ${useRandomize(-12, 12)}px ${useRandomize(-12, 14)}px
      ${useRandomize(11, 16)}px rgba(0, 0, 0, ${useRandomize(2, 4) / 10})
    )`,
      }}
    >
      <div
        ref={ref}
        className={`${styles.image} ${styles.cutout} ${
          accent ? styles.accent : ''
        } ${invert ? styles.invert : ''}`}
        style={{
          top,
          left,
          right,
          bottom,
          transform: `rotate3d(${skew.x}, ${skew.y}, ${skew.z}, ${
            skew.deg
          }deg) scale(${
            1 + useRandomize(0, 1) / 10
          }) translate3d(${useRandomize(-5, 5)}px, ${useRandomize(
            -5,
            5
          )}px, ${useRandomize(-5, 5)}px)`,
          maskSize: `${useRandomize(90, 100)}%`,
        }}
      >
        <div ref={edge} className={styles.edge} />
        <Image
          src={src}
          alt={'texture'}
          fill
          style={{ transform: 'scale(0.99)' }}
        />
        <div className={styles.overlay} />
        <Image
          src={`/textures/plastic/plastic_${useRandom(1, 12)}.png`}
          alt={'texture'}
          fill
          style={{ opacity: 0.4 }}
        />
        <Image
          src={`/textures/film/film_${useRandom(1, 6)}.png`}
          alt={'film'}
          fill
          style={{
            transform: `rotate(${useRandom(0, 4) * 90}deg)`,
            opacity: 0.5,
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    </div>
  )
}

export default Magazine
