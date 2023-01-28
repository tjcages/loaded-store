import React, { useState } from 'react'
import Image from 'next/image'
import { isValidPhoneNumber } from 'react-phone-number-input'

import styles from './style.module.scss'

import Input from './common/Input'
import Button from './common/Button'
import Cutout from './common/Cutout'

const NewComponent = () => {
  const [value, setValue] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (isValidPhoneNumber(value)) {
      // copy phone value
      const subscriptionPhone = value
      // clear input
      setValue('')

      // send phone to backend
      await fetch('/api/drops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: subscriptionPhone, location: 'Drops' }),
      })

      // disable button
      setSubmitted(true)
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
          <Cutout text={"You're in"} invert top={'45%'} left={'35%'} />
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

        <Cutout text={"World's greatest"} top={-20} />
        <Cutout text={'Sporting gear'} top={10} right={-10} />

        <Cutout text={'Winter'} accent bottom={20} left={0} />
        <Cutout text={'Drop'} accent bottom={0} />
        <Cutout text={'2023'} accent bottom={-10} right={140} />
        <Cutout text={'Coming Soon'} accent bottom={40} right={-10} />
      </div>
    </div>
  )
}

export default NewComponent
