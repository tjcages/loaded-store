import React, { useState } from 'react'
import Image from 'next/image'

import styles from './style.module.scss'

import { Grid } from '../common/Cutouts'

const Product = () => {
  const array = [1, 2, 3, 4]
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

        <div className={styles.cutout}>
          <Grid top={"100%"} />
        </div>
      </div>
    </div>
  )
}

export default Product
