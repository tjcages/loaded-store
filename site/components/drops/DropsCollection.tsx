import React, { useState } from 'react'
import Image from 'next/image'
import PhoneInput from 'react-phone-number-input/input'

import styles from './style.module.scss'

import Shader from './Shader'

const DropsCollection = () => {
  const [value, setValue] = useState('')

  return (
    <div className={styles.main}>
      <Shader />

      <div className={styles.header}>
        <div className={styles.title}>
          <h2 className={styles.h2}>New Year New Drops</h2>
          <div className={styles.p}>A Loaded Of America Creation</div>
          <div className={styles.stamps}>
            <Image
              className={styles.stamp}
              src="/icon-144x144.png"
              alt="Loaded"
              width={70}
              height={70}
            />
            <div className={styles.info}>
              The world's greatest sporting&nbsp;goods apparel
            </div>
          </div>
        </div>
        <div className={styles.subtitle}>
          <div className={styles.p}>VOL#1 –– LA</div>
          <div className={styles.p}>January 2023</div>
          <div className={styles.p}>Page 01</div>
          <div className={styles.p}>Coming Soon</div>
        </div>
        <div className={styles.capture}>
          <PhoneInput
            className={styles.input}
            placeholder="Enter phone number"
            country="US"
            value={value}
            onChange={(value) => (value ? setValue(value) : setValue(''))}
          />
          <button className={styles.button}>Notify Me</button>
        </div>
      </div>
      <div className={styles.footer}>
        <h1 className={styles.h1}>LOADED</h1>
      </div>
    </div>
  )
}

export default DropsCollection
