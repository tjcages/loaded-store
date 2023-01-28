import React, { useState } from 'react'
import Image from 'next/image'
import { isValidPhoneNumber } from 'react-phone-number-input'
import useMediaQuery, { mobileBreakpoint } from '../../hooks/mobile'

import styles from './style.module.scss'

import { Text, Input, Button } from '../common/Cutouts'

const NewComponent = () => {
  const mobile = useMediaQuery(mobileBreakpoint)

  const [value, setValue] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (isValidPhoneNumber(value)) {
      // copy phone value
      const subscriptionPhone = value
      // clear input
      setValue('')
      // disable button
      setSubmitted(true)

      // send phone to backend
      await fetch('/api/drops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: subscriptionPhone, location: 'Drops' }),
      })
    }
  }

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
        {submitted ? (
          <Text text={"You're in"} invert top={'45%'} left={'35%'} />
        ) : (
          <>
            <Input
              top={'45%'}
              right={'40%'}
              value={value}
              setValue={(value) => {
                setValue(value)
                setDisabled(!isValidPhoneNumber(value))
              }}
              enterPressed={handleSubmit}
            />
            <Button
              accent
              invert
              top={'45%'}
              left={'55%'}
              onClick={handleSubmit}
              disabled={disabled}
            />
          </>
        )}

        <Text text={'Sporting gear'} top={10} right={mobile ? 50 : -10} />
        <Text text={"World's greatest"} top={-20} />

        <Text text={'Winter'} accent bottom={20} left={mobile ? 20 : 0} />
        <Text text={'Drop'} accent bottom={0} />
        <Text text={'2023'} accent bottom={-10} right={140} />
        <Text
          text={'Coming Soon'}
          accent
          bottom={40}
          right={mobile ? 20 : -10}
        />
      </div>
    </div>
  )
}

export default NewComponent
