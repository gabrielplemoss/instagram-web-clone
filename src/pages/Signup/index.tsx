import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/Instagram-logo.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

import styles from './styles.module.css'

const Signup: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <div className={styles.containerLogo}>
          <img src={logo} alt="logo" />
        </div>
        <form method="post">
          <span className={styles.formTitle}>Cadastre-se para ver fotos e vídeos dos seus amigos.</span>
          <Input required type="text" id='username' labelText='nome de usuario' />
          <Input required type="text" id='email' labelText='email' />
          <Input required type="password" id='password' labelText='senha' />
          <Input required type="password" id='passwordConfirmation' labelText='confirmação de senha' />
          <Button disabled text="cadastrar-se" />
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
