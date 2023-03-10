import React, { useEffect, useState, useRef, FC } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { cutout } from './cutout'
import { useRandomize, useRandom } from '../../../hooks/random'

import styles from './style.module.scss'

interface Props {
  text?: string
  float?: boolean
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  accent?: boolean
  invert?: boolean
  value: string
  setValue: (value: string) => void
  enterPressed: () => void
}

const Cutout: FC<Props> = ({
  text = 'Phone number',
  float,
  top,
  left,
  right,
  bottom,
  accent,
  invert,
  value,
  setValue,
  enterPressed,
}) => {
  const ref = useRef<HTMLHeadingElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const shape = ref.current
    if (shape) {
      cutout(shape, 7)
    }
  }, [])

  return (
    <div
      className={`${styles.main} ${styles.input} ${float ? styles.float : ''}`}
      style={{
        top,
        left,
        right,
        bottom,
        opacity: isMounted ? 1 : 0,
        filter: `drop-shadow(
          ${useRandom(-6, 0)}px ${useRandom(0, 6)}px
          ${useRandom(1, 6)}px rgba(0, 0, 0, ${useRandom(2, 5) / 10})
        )`,
      }}
    >
      <PhoneInput
        ref={ref}
        placeholder={text}
        country="US"
        value={value}
        onChange={(value) => (value ? setValue(value) : setValue(''))}
        onKeyPress={(e: { key: string; preventDefault: () => void }) => {
          if (e.key === 'Enter') {
            enterPressed()
            e.preventDefault()
          }
        }}
        className={`${styles.input} ${styles.cutout} ${
          accent ? styles.accent : ''
        } ${invert ? styles.invert : ''}`}
        style={{
          padding: `${useRandom(5, 10)}px ${useRandom(10, 15)}px ${useRandom(
            5,
            15
          )}px
          ${useRandom(20, 30)}px`,
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
          maskSize: `${useRandomize(90, 100)}%`,
        }}
      />
    </div>
  )
}

export default Cutout
