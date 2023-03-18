import React, { EffectCallback, useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import logo from '../../assets/Instagram-logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Slide from './components/Slide'
import AuthFails, { IAuthFails } from '../../components/AuthFails'
import { useForm, SigninForm, FormError } from '../../hooks/useForm'
import validators from '../../validation/validators'
import styles from './styles.module.css'

const Signin: React.FC = () => {
  const [showSlide, setshowSlide] = React.useState(true)
  const [authFails, setAuthFails] = useState<IAuthFails | string>('')
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
    setFormError,
    setAuthFails
  })
  const { signin } = useContext(AuthContext)

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await signin({
        login: form.login,
        password: form.password
      })
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK'){
        setAuthFails('Falha de conexão, Tente novamente')
        return
      }
      const response = error.response
      setAuthFails(response.data.error)
    }
  }

  return (
    <div className={styles.smallContainer}>
      {showSlide && <Slide />}
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <div className={styles.containerLogo}>
            <img src={logo} alt="logo" />
          </div>
          <form noValidate onSubmit={handleSubmit}>
            <Input {...formHook} formError={formError} required type="text" name="login" labelText="nome de usuario ou email" />
            <Input {...formHook} formError={formError} required type="password" name="password" labelText="senha" />
            <Button disabled={submitDisabled} text="entrar" />
            {authFails && <AuthFails fails={authFails} />}
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
