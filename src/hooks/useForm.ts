import React from 'react'
import { IAuthFails } from '../components/AuthFails'

interface SignupForm {
	username: string
	email: string
	password: string
	passwordConfirmation: string
}

interface SigninForm {
	login: string
	password: string
}

type FormFields = SignupForm | SigninForm

interface FormError {
	valid: string[]
	invalid: string[]
}

interface Validators {
	usernameValidator: (username: string) => boolean
	emailValidator: (email: string) => boolean
	passwordLengthValidator: (password: string) => boolean
	compareFieldsValidator: (password: string, passwordConfirmation: string) => boolean
	loginValidator: (login: string) => boolean
}

interface UseFormParams<T> {
	form: FormFields
	setForm: React.Dispatch<React.SetStateAction<T>>
	setSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>
	validators: Validators
	setFormError: React.Dispatch<React.SetStateAction<FormError>>
	setAuthFails: React.Dispatch<React.SetStateAction<IAuthFails | string>>
}

interface UseFormReturn {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onFocus: (event: React.FocusEvent<HTMLInputElement, Element>) => void
	onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void
}

function useForm<T>({ form, setForm, setSubmitDisabled, validators, setFormError, setAuthFails }: UseFormParams<T>): UseFormReturn {
	let oldForm = form

	function switchFormValidation(form: any, field: string): boolean | undefined {
		switch (field) {
			case 'username':
				return validators.usernameValidator(form.username)
			case 'email':
				return validators.emailValidator(form.email)
			case 'password':
				return validators.passwordLengthValidator(form.password)
			case 'passwordConfirmation':
				return validators.compareFieldsValidator(form.password, form.passwordConfirmation)
			case 'login':
				return validators.loginValidator(form.login)
		}
	}

	function completeFormValidation(form: FormFields): boolean {
		const keys = Object.keys(form)
		let erro = false
		for (const key of keys) {
			const isFormValid = switchFormValidation(form, key)
			if (!isFormValid) {
				erro = true
			}
		}

		return erro
	}

	function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const target = event.target
		const inputName = target.name
		oldForm[inputName as keyof FormFields] = target.value
		const enableSubmit = completeFormValidation(oldForm)
		if (!enableSubmit) {
			setSubmitDisabled(false)
		} else {
			setForm(oldForm as T)
			setSubmitDisabled(true)
		}
	}

	function onFocus(event: React.FocusEvent<HTMLInputElement, Element>): void {
		const inputName = event.target.name
		setAuthFails('')
		setFormError(({ invalid, valid }: any) => {
			const index = invalid.indexOf(inputName)
			if (index !== -1) {
				invalid.splice(index, 1)
			}
			return {
				invalid,
				valid
			}
		})
	}

	function onBlur(event: React.FocusEvent<HTMLInputElement, Element>): void {
		const inputName = event.target.name
		const validation = switchFormValidation(form, inputName)
		setFormError(({ invalid, valid }) => {
			if (!validation) {
				if (!invalid.includes(inputName)) {
					invalid.push(inputName)
				}
				if (valid.includes(inputName)) {
					const index = valid.indexOf(inputName)
					valid.splice(index, 1)
				}
			} else if (validation) {
				if (!valid.includes(inputName)) {
					valid.push(inputName)
				}
				if (invalid.includes(inputName)) {
					const index = invalid.indexOf(inputName)
					invalid.splice(index, 1)
				}
			}
			return {
				valid,
				invalid
			}
		})
	}

	return {
		onChange,
		onBlur,
		onFocus
	}
}

export {
	useForm,
	type FormFields,
	type SignupForm,
	type SigninForm,
	type FormError
}
