import React, { useEffect, useRef, FC } from 'react'
import Image from 'next/image'
import { cutoutGrid } from './cutout'
import { useRandomize, useRandom } from '../../../hooks/random'

import styles from './style.module.scss'

interface Props {
  src: string
  alt: string | undefined
  topLeft?: boolean
  topRight?: boolean
  bottomLeft?: boolean
  bottomRight?: boolean
}

const Photo: FC<Props> = ({
  src,
  alt = 'product image',
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}) => {
  const ref = useRef<HTMLImageElement>(null)
  const edge = useRef<HTMLDivElement>(null)
  const angle = useRandomize(-10, 10)

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
      className={styles.photo}
      style={{
        transform: `rotate(${angle}deg) scale(${
          1 + useRandomize(0, 1) / 10
        }) translate3d(${useRandomize(-5, 5)}px, ${useRandomize(
          -5,
          5
        )}px, ${useRandomize(-5, 5)}px)`,
      }}
    >
      <Image
        className={styles.image}
        src={src}
        alt={alt}
        quality="85"
        width={600}
        height={600}
        style={{ width: '100%', height: 'auto' }}
      />
      <div className={styles.overlay} />
      <Image
        src={`/textures/plastic/plastic_${useRandomize(1, 12)}.png`}
        alt={'plastic-texture'}
        quality="85"
        fill
        style={{
          opacity: 0.4,
          mixBlendMode: 'overlay',
          maskImage: `url(${src})`,
        }}
      />
      <Image
        className={styles.overlay}
        src={`/textures/film/film_${useRandomize(1, 6)}.png`}
        alt={'film-texture'}
        quality="85"
        fill
        style={{
          opacity: 0.4,
          mixBlendMode: 'overlay',
          maskImage: `url(${src})`,
        }}
      />
    </div>
  )
}

export default Photo
