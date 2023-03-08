import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Instagram-logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useForm, FormFields } from '../../hooks/useForm'
import validators from '../../validation/validators'
import styles from './styles.module.css'

const Signup: React.FC = () => {
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [formErro, setFormErro] = useState<string[]>([])
  const [form, setform] = useState<FormFields>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const formHook = useForm({
    form,
    setform,
    setSubmitDisabled,
    validators,
    setFormErro
  })

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <div className={styles.containerLogo}>
          <img src={logo} alt="logo" />
        </div>
        <form method="post">
          <span className={styles.formTitle}>Cadastre-se para ver fotos e vídeos dos seus amigos.</span>
          <Input {...formHook} required type="text" name='username' labelText='nome de usuario' />
          <Input {...formHook} required type="text" name='email' labelText='email' />
          <Input {...formHook} required type="password" name='password' labelText='senha' />
          <Input {...formHook} required type="password" name='passwordConfirmation' labelText='confirmação de senha' />
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
