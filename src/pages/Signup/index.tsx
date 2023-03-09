import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Instagram-logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useForm, SignupForm, FormError } from '../../hooks/useForm'
import validators from '../../validation/validators'
import styles from './styles.module.css'

const Signup: React.FC = () => {
  const [submitDisabled, setSubmitDisabled] = useState(true)
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

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <div className={styles.containerLogo}>
          <img src={logo} alt="logo" />
        </div>
        <form method="post">
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
