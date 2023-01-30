import React, { useEffect, useState, useRef, FC } from 'react'
import Image from 'next/image'
import { cutout } from './cutout'
import { useRandomize, useRandom } from '../../../hooks/random'

import styles from './style.module.scss'

interface Props {
  text?: string
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  accent?: boolean
  invert?: boolean
  onClick?: () => void
  disabled?: boolean
}

const Cutout: FC<Props> = ({
  top,
  left,
  right,
  bottom,
  accent,
  invert,
  onClick,
  disabled,
}) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const shape = ref.current
    if (shape) {
      cutout(shape)
    }
  }, [])

  const positions = ['top', 'left', 'right', 'bottom', 'center']

  return (
    <div
      className={`${styles.main} ${styles.button}`}
      style={{
        top,
        left,
        right,
        bottom,
        opacity: isMounted ? 1 : 0,
        filter: `drop-shadow(
          ${useRandom(-2, 2)}px ${useRandom(-2, 4)}px
          ${useRandom(1, 6)}px rgba(0, 0, 0, ${useRandom(1, 4) / 10})
        )`,
      }}
    >
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${styles.cutout} ${
          accent ? styles.accent : ''
        } ${invert ? styles.invert : ''}`}
        style={{
          padding: `${useRandom(5, 10)}px ${useRandom(10, 15)}px ${useRandom(
            5,
            15
          )}px
          ${useRandom(10, 20)}px`,
          clipPath: `polygon(${useRandom(0, 20)}% 0%, 100% ${useRandom(
            0,
            15
          )}%, ${useRandom(80, 100)}% ${useRandom(60, 100)}%, 0 ${useRandom(
            60,
            100
          )}%, 0 ${useRandom(0, 40)}%`,
          transform: `rotate3d(${useRandom(-1, 1)}, ${useRandom(
            -1,
            1
          )}, 1, ${useRandom(
            left != null ? (top != null ? -15 : 15) : -2,
            right != null ? (top != null ? 15 : -15) : 2
          )}deg) scale(${1 + useRandom(0, 1) / 10}) translate3d(${useRandom(
            -1,
            1
          )}px, ${useRandom(-1, 1)}px, ${useRandom(-1, 1)}px)`,
          maskSize: `${useRandomize(100, 400)}% ${useRandomize(100, 400)}%`,
          maskPosition: `${positions[useRandomize(0, positions.length - 1)]}`,
        }}
      >
        Subscribe
        <Image
          src={`/textures/plastic/plastic_${useRandomize(1, 12)}.png`}
          alt={'texture'}
          fill
          style={{ opacity: 0.3 }}
        />
      </button>
    </div>
  )
}

export default Cutout
