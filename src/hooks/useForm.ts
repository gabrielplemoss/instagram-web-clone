import React from 'react'

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
	setFormErro: React.Dispatch<React.SetStateAction<string[]>>
}

interface UseFormReturn {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onFocus: (event: React.FocusEvent<HTMLInputElement, Element>) => void
	onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void
}

function useForm<T>({ form, setForm, setSubmitDisabled, validators, setFormErro }: UseFormParams<T>): UseFormReturn {
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
		setFormErro((oldError) => {
			const newErro: string[] = []
			oldError.forEach((value) => {
				if (value !== inputName) {
					newErro.push(value)
				}
			})

			return newErro
		})
	}

	function onBlur(event: React.FocusEvent<HTMLInputElement, Element>): void {
		const inputName = event.target.name
		const validation = switchFormValidation(form, inputName)
		if (!validation) {
			setFormErro(oldError => [...oldError, inputName])
		}
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
	type SigninForm
}
