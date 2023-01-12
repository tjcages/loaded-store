import React from "react"
import { Container, Text } from '@components/ui'

import DropsCollection from "../components/drops"

export default function Drops() {
  return (
    <Container className="pt-4">
      <div className="grid grid-cols-4">
        <DropsCollection />
      </div>
    </Container>
  )
}
