import React, { EffectCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Instagram-logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Slide from './components/Slide'
import { useForm, SigninForm, FormError } from '../../hooks/useForm'
import validators from '../../validation/validators'
import styles from './styles.module.css'

const Signin: React.FC = () => {
  const [showSlide, setshowSlide] = React.useState(true)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [formError, setFormError] = useState<FormError>({
    valid: [],
    invalid: []
  })
  const [form, setForm] = useState<SigninForm>({
    login: '',
    password: '',
  })
  const maxWidthQuery = 875
  const formHook = useForm<SigninForm>({
    form,
    setForm,
    setSubmitDisabled,
    validators,
    setFormError
  })

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
            <Input {...formHook} formError={formError} required type="text" name="login" labelText="nome de usuario ou email" />
            <Input {...formHook} formError={formError} required type="password" name="password" labelText="senha" />
            <Button disabled={submitDisabled} text="entrar" />
          </form>
          <div className={styles.division}>
            <p>ou</p>
          </div>
          <a className={styles.forgotPassword} href="#">Esqueceu a senha ?</a>
        </div>
        <div className={styles.containerSignup}>
          <p>
            Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin
