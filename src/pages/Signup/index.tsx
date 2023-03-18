import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import logo from '../../assets/Instagram-logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import AuthFails, { IAuthFails } from '../../components/AuthFails'
import { useForm, SignupForm, FormError } from '../../hooks/useForm'
import validators from '../../validation/validators'
import styles from './styles.module.css'

const Signup: React.FC = () => {
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [authFails, setAuthFails] = useState<IAuthFails | string>('')
  const [formError, setFormError] = useState<FormError>({
    valid: [],
    invalid: []
  })
  const [form, setForm] = useState<SignupForm>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const formHook = useForm<SignupForm>({
    form,
    setForm,
    setSubmitDisabled,
    validators,
    setFormError,
    setAuthFails
  })
  const { signup } = useContext(AuthContext)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitDisabled(true)
    try {
      await signup({
        username: form.username,
        email: form.email,
        password: form.password
      })
    } catch (error: any) {
      setSubmitDisabled(false)
      if (error.code === 'ERR_NETWORK'){
        setAuthFails('Falha de conexão, Tente novamente')
        return
      }
      const response = error.response
      setAuthFails(response.data.error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <div className={styles.containerLogo}>
          <img src={logo} alt="logo" />
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <span className={styles.formTitle}>Cadastre-se para ver fotos e vídeos dos seus amigos.</span>
          <Input {...formHook} formError={formError} required type="text" name="username" labelText="nome de usuario" />
          <Input {...formHook} formError={formError} required type="text" name="email" labelText="email" />
          <Input {...formHook} formError={formError} required type="password" name="password" labelText="senha" />
          <Input {...formHook} formError={formError} required type="password" name="passwordConfirmation" labelText="confirmação de senha" />
          <Button disabled={submitDisabled} text="cadastrar-se" />
          {authFails && <AuthFails fails={authFails} />}
        </form>
      </div>
      <div className={styles.containerSignin}>
        <p>
          Tem uma conta ? <Link to="/">Conecte-se</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
