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
	fails: IAuthFails
}

const AuthFails: React.FC<IAuthFailsProps> = ({ fails }) => {
	return (
		<div className={styles.container}>
			<p>{fails.fields[0].message}</p>
		</div>
	)
}

export default AuthFails
