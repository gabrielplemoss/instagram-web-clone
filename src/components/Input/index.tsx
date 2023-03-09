import React, { InputHTMLAttributes, useRef } from 'react'
import styles from './styles.module.css'
import Error from './Error'

interface InputParams extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	labelText: string
	formError: {
		valid: string[],
		invalid: string[]
	}
}

const Input: React.FC<InputParams> = ({ formError, labelText, ...rest }) => {
	const { valid, invalid } = formError

	return (
		<div className={styles.containerInput}>
			<input className={styles.input} {...rest} />
			<label className={styles.inputLabel} htmlFor={rest.id}>{labelText}</label>
			<Error valid={valid} invalid={invalid} name={rest.name} />
		</div>
	)
}

export default Input
