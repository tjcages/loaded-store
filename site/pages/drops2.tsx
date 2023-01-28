import React from 'react'
import { Container, Text } from '@components/ui'

import DropsCollection from '../components/drops/Drops2'

export default function Drops() {
  return (
    <Container className="pt-4">
      <div className="grid grid-cols-4">
        <DropsCollection />
      </div>
    </Container>
  )
}
