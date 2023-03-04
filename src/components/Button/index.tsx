import React, { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface ButtonParams extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
}

const Button: React.FC<ButtonParams> = ({ text, ...rest }) => {
	return <button className={styles.button} {...rest}>{text}</button>
}

export default Button
