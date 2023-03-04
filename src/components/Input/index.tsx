import React, { InputHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface InputParams extends InputHTMLAttributes<HTMLInputElement> {
	labelText: string
}

const Input: React.FC<InputParams> = ({ labelText, ...rest }) => {
  return <div className={styles.containerInput}>
    <input className={styles.input} {...rest} />
    <label className={styles.inputLabel} htmlFor={rest.id}>{labelText}</label>
  </div>
}

export default Input
