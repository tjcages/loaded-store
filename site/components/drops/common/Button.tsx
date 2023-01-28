import React, { useEffect, useState, FC } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { useRandom } from '../../../hooks/random'

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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
        }}
      >
        Submit
      </button>
    </div>
  )
}

export default Cutout
