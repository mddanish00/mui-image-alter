import * as React from 'react';

import { styled } from '@mui/material-pigment-css';

import clsx from 'clsx';

import { ImageProps, MuiImage, ImageTypeMap } from './Image.types';
import useImage from './useImage';

/**
 * A custom image component that satisfy the Material guidelines for loading images.
 *
 * Fork by mddanish00. Original by benmneb.
 * 
 * EXPERIMENTAL. For use with MUI v6 and Pigment CSS
 *
 * API: https://github.com/mddanish00/mui-image/blob/master/README.md
 */
const ImagePigment = React.forwardRef(
	<BaseComponentType extends React.ElementType = ImageTypeMap['defaultComponent']>(
		{
			src,
			alt = '',
			position = 'relative',
			fit = 'cover',
			style,
			className = '',
			showLoading = false,
			errorIcon = true,
			shift = false,
			distance = 100,
			shiftDuration = undefined,
			bgColor = 'inherit',
			wrapperStyle,
			iconWrapperStyle,
			wrapperClassName = '',
			iconWrapperClassName = '',
			duration = 3000,
			easing = 'cubic-bezier(0.7, 0, 0.6, 1)', // "heavy move" from https://sprawledoctopus.com/easing/,
			onLoad: onLoadProp,
			onError: onErrorProp,
			component = 'img',
			...rest
		}: React.PropsWithoutRef<ImageProps<BaseComponentType>>,
		componentRef: React.ForwardedRef<any>,
	) => {
		const {
			loaded,
			error,
			observedRef,
			currentHeight,
			currentWidth,
			initialHeight,
			initialWidth,
			handleLoad,
			handleError,
			showErrorIcon,
			loadingIndicator,
			shiftStyles,
		} = useImage(
			componentRef,
			shift,
			distance,
			errorIcon,
			showLoading,
			rest.height,
			rest.width,
			onLoadProp,
			onErrorProp,
		);

		return (
			<MuiImageWrapper
				className={clsx('MuiImageAlter-wrapper', wrapperClassName)}
				style={{
					'--MuiImageWrapper-bgColor': bgColor,
					'--MuiImageWrapper-rootHeight': currentHeight ? currentHeight : initialHeight,
					'--MuiImageWrapper-rootWidth': currentWidth ? currentWidth : initialWidth,
					...wrapperStyle,
				}}
			>
				<MuiImageRoot
					ref={observedRef}
					as={component}
					src={src}
					alt={alt}
					style={{
						'--MuiImageRoot-position': position,
						'--MuiImageRoot-fit': fit,
						'--MuiImageRoot-transitionProperty': `${Boolean(shift) ? `${shift}, ` : ''}opacity`,
						'--MuiImageRoot-transitionDuration': `${
							Boolean(shift) ? `${shiftDuration || duration * 0.3}ms, ` : ''
						}${duration / 2}ms`,
						'--MuiImageRoot-easing': easing,
						'--MuiImageRoot-opacity': loaded ? 0 : 1,
						'--MuiImageRoot-animation': loaded ? `materialize ${duration}ms 1 ${easing}` : '',
						...(Boolean(shift) && shiftStyles),
						...style,
					}}
					className={clsx('MuiImageAlter-img', className)}
					onLoad={handleLoad}
					onError={handleError}
					position={position}
					fit={fit}
					shift={shift}
					shiftDuration={shiftDuration}
					shiftStyles={shiftStyles}
					duration={duration}
					easing={easing}
					loaded={loaded}
					{...rest}
				/>
				{(Boolean(showLoading) || Boolean(errorIcon)) && (
					<MuiImageIconWrapper
						className={clsx('MuiImageAlter-iconWrapper', iconWrapperClassName)}
						style={{
							'--MuiImageIconWrapper-opacity': loaded ? 0 : 1,
							...iconWrapperStyle,
						}}
					>
						{Boolean(errorIcon) && error && showErrorIcon}
						{Boolean(showLoading) && !error && !loaded && loadingIndicator}
					</MuiImageIconWrapper>
				)}
			</MuiImageWrapper>
		);
	},
) as MuiImage<ImageTypeMap>;

const MuiImageRoot = React.memo(
	styled('img')({
		//@ts-ignore
		'@keyframes materialize': {
			'0%': {
				filter: 'saturate(20%) contrast(50%) brightness(120%)',
			},
			'75%': {
				filter: 'saturate(60%) contrast(100%) brightness(100%)',
			},
			'100%': {
				filter: 'saturate(100%) contrast(100%) brightness(100%)',
			},
		},
		position: 'var(--MuiImageRoot-position)',
		objectFit: 'var(--MuiImageRoot-fit)',
		transitionProperty: 'var(--MuiImageRoot-transitionProperty)',
		transitionDuration: 'var(--MuiImageRoot-transitionDuration)',
		transitionTimingFunction: 'var(--MuiImageRoot-easing)',
		opacity: 'var(--MuiImageRoot-opacity)',
		animation: 'var(--MuiImageRoot-animation)',
	}),
);

const MuiImageWrapper = React.memo(
	styled('div')({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'var(--MuiImageWrapper-bgColor)',
		height: 'var(--MuiImageWrapper-rootHeight)',
		width: 'var(--MuiImageWrapper-rootWidth)',
	}),
);

const MuiImageIconWrapper = React.memo(
	styled('div')({
		width: '100%',
		marginLeft: '-100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 'var(--MuiImageIconWrapper-opacity)',
	}),
);

export default ImagePigment;
