import React, { EffectCallback, useEffect } from 'react'

import logo from '../../assets/Instagram-logo.png'

import Input from '../../components/Input'
import Button from '../../components/Button'
import Slide from './components/Slide'

import styles from './styles.module.css'

const Signin: React.FC = () => {
  const [showSlide, setshowSlide] = React.useState(true)
  const maxWidthQuery = 875

  useEffect((): ReturnType<EffectCallback> => {
    const mediaQueryEvent = window.matchMedia('(max-width: 875px)')
    if (window.innerWidth <= maxWidthQuery) {
      setshowSlide(false)
    }
    mediaQueryEvent.onchange = (): void => {
      if (window.innerWidth <= maxWidthQuery) {
        setshowSlide(false)
      }
      else {
        setshowSlide(true)
      }
    }
    return (): void => {
      mediaQueryEvent.onchange = null
    }
  }, [])

  return (
    <div className={styles.smallContainer}>
      {showSlide && <Slide />}
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <div className={styles.containerLogo}>
            <img src={logo} alt="logo" />
          </div>
          <form method="post">
            <Input required type="text" id='username' labelText='nome de usuario ou email' />
            <Input required type="password" id='password' labelText='senha' />
            <Button disabled text="entrar" />
          </form>
          <div className={styles.division}>
            <p>ou</p>
          </div>
          <a className={styles.forgotPassword} href="#">Esqueceu a senha ?</a>
        </div>
        <div className={styles.containerSignup}>
          <p>
            Não tem uma conta? <a href="#">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin
