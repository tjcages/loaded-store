import React, { useEffect, useRef, FC, ReactNode } from 'react'
import Image from 'next/image'
import { cutoutGrid } from './cutout'
import { useRandomize, useRandom } from '../../../hooks/random'

import styles from './style.module.scss'

interface Props {
  children: ReactNode
}

const Container: FC<Props> = ({ children }) => {
  const ref = useRef<HTMLImageElement>(null)
  const edge = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shape = ref.current
    if (shape) {
      cutoutGrid(shape)
      if (edge.current) {
        edge.current.style.clipPath = shape.style.clipPath
      }
    }
  }, [])

  return (
    <div
      className={styles.main}
      style={{
        opacity: 1,
        filter: `drop-shadow(
          ${useRandomize(-2, 2)}px ${useRandomize(-2, 4)}px
          ${useRandomize(1, 6)}px rgba(0, 0, 0, ${useRandomize(1, 4) / 10})
        )`,
      }}
    >
      <div
        ref={ref}
        className={styles.cutout}
        style={{
          padding: `${useRandomize(5, 10)}px ${useRandomize(
            0,
            5
          )}px ${useRandomize(10, 20)}px
        ${useRandomize(0, 5)}px`,
          transform: `rotate3d(${useRandomize(-1, 1)}, ${useRandomize(
            -1,
            1
          )}, 1, ${useRandomize(-5, 5)}deg) scale(${
            1 + useRandomize(0, 1) / 10
          }) translate3d(${useRandomize(-1, 1)}px, ${useRandomize(
            -1,
            1
          )}px, ${useRandomize(-1, 1)}px)`,
          maskSize: `${useRandomize(90, 100)}%`,
        }}
      >
        {children}
        <Image
          src={`/textures/plastic/plastic_${useRandomize(1, 12)}.png`}
          alt={'texture'}
          fill
          style={{ opacity: 0.5, pointerEvents: 'none' }}
        />
      </div>
    </div>
  )
}

export default Container
