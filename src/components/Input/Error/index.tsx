import errorSvg from '../../../assets/svg/error.svg'
import okSvg from '../../../assets/svg/ok.svg'
import styles from './styles.module.css'

interface Error {
	name: string
	valid: string[]
	invalid: string[]
}

const Error: React.FC<Error> = ({ invalid, valid, name }) => {
	const error = invalid.includes(name)
	const ok = valid.includes(name)
	let icone = ''

	if (ok) {
		icone = okSvg
	} else if (error) {
		icone = errorSvg
	}

	if (!error && !ok) {
		return null
	}

	return (
		<div className={styles.container}>
			<img src={icone} />
		</div>
	)

}

export default Error
