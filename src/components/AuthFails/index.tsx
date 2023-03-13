import styles from './styles.module.css'

interface AuthFieldError {
	field: string
	message: string
}

export interface IAuthFails {
	name: string
	fields: AuthFieldError[]
}

interface IAuthFailsProps {
	fails: IAuthFails | string
}

const AuthFails: React.FC<IAuthFailsProps> = ({ fails }) => {
	let messageError = ''
	if (typeof fails === 'string') {
		messageError = fails
	} else {
		messageError = fails.fields[0].message
	}

	return (
		<div className={styles.container}>
			<p>{messageError}</p>
		</div>
	)
}

export default AuthFails
