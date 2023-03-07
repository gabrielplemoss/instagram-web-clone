import React, { useRef, useEffect, EffectCallback } from 'react'

import styles from './styles.module.css'
import imagesSlide from './imagesSlide'

const Slide: React.FC = () => {
	const imgRef = useRef({} as HTMLImageElement)
	let photoIndex = 0

	useEffect((): ReturnType<EffectCallback> => {
		const interval = setInterval(() => {
			if (photoIndex >= imagesSlide.length - 1) {
				photoIndex = 0
			} else {
				photoIndex++
			}
			imgRef.current.src = imagesSlide[photoIndex]
		}, 5000)
		return (): void => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className={styles.slideContainer}>
			<div className={styles.slideContainerImg}>
				<img ref={imgRef} src={imagesSlide[photoIndex]} alt="slide photo" />
			</div>
		</div>
	)
}

export default Slide
