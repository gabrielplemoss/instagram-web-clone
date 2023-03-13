import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import logo from '../../assets/Instagram-logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useForm, SignupForm, FormError } from '../../hooks/useForm'
import validators from '../../validation/validators'
import styles from './styles.module.css'

interface SignupFielError {
  field: string
  message: string
}

interface SignupFails {
  name: string
  fields: SignupFielError[]
}

const Signup: React.FC = () => {
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [signupFails, setSignupFails] = useState<SignupFails>({} as SignupFails)
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
    setFormError
  })
  const { signup } = useContext(AuthContext)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await signup({
        username: form.username,
        email: form.email,
        password: form.password
      })
    } catch (error: any) {
      const response = error.response
      setSignupFails(response.data.error)
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
