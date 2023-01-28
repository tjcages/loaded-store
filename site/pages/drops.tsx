import React from 'react'
import { Container, Text } from '@components/ui'
import styles from '../styles/_main.module.scss'

import DropsComponent from '../components/drops'

export default function Drops() {
  return (
    <Container className="pt-4">
      <div className={styles.main}>
        <DropsComponent />
      </div>
    </Container>
  )
}
