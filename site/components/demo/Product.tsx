import React, { useState } from 'react'
import Image from 'next/image'

import styles from './style.module.scss'

const Product = () => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <Image
          priority
          className={styles.logo}
          src="/icon-512x512.png"
          alt="bullseye logo"
          width={200}
          height={200}
        />
      </div>
    </div>
  )
}

export default Product
