import * as React from 'react';

import { styled } from '@mui/material/styles';

import clsx from 'clsx';

import { ImageProps, MuiImage, ImageTypeMap } from './Image.types';
import useImage from './useImage';

/**
 * A custom image component that satisfy the Material guidelines for loading images.
 *
 * Fork by mddanish00. Original by benmneb.
 *
 * API: https://github.com/mddanish00/mui-image/blob/master/README.md
 */
const Image = React.forwardRef(
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
			sx,
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
				sx={sx}
				style={wrapperStyle}
				bgColor={bgColor}
				rootHeight={currentHeight ? currentHeight : initialHeight}
				rootWidth={currentWidth ? currentWidth : initialWidth}
			>
				<MuiImageRoot
					ref={observedRef}
					as={component}
					src={src}
					alt={alt}
					style={style}
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
						style={iconWrapperStyle}
						loaded={loaded}
					>
						{Boolean(errorIcon) && error && showErrorIcon}
						{Boolean(showLoading) && !error && !loaded && loadingIndicator}
					</MuiImageIconWrapper>
				)}
			</MuiImageWrapper>
		);
	},
) as MuiImage<ImageTypeMap>;

// Utility functions
const checkProps = (value: string, arr: string[]) => !arr.includes(value);

interface ImgRootProps {
	position: React.CSSProperties['position'];
	fit: React.CSSProperties['objectFit'];
	shift?: 'left' | 'right' | 'top' | 'bottom' | false | null;
	shiftDuration?: number;
	shiftStyles: {
		[x: string]: string | number;
	};
	duration: number;
	easing: React.CSSProperties['transitionTimingFunction'];
	loaded: boolean;
}

// Custom component using styled
const MuiImageRoot = React.memo(
	styled('img', {
		shouldForwardProp: (prop) =>
			checkProps(prop.toString(), [
				'position',
				'fit',
				'shift',
				'shiftDuration',
				'shiftStyles',
				'duration',
				'easing',
				'loaded',
				'sx',
				'as',
			]),
	})<ImgRootProps>((props) => ({
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
		position: props.position,
		objectFit: props.fit,
		transitionProperty: `${Boolean(props.shift) ? `${props.shift}, ` : ''}opacity`,
		transitionDuration: `${
			Boolean(props.shift) ? `${props.shiftDuration || props.duration * 0.3}ms, ` : ''
		}${props.duration / 2}ms`,
		transitionTimingFunction: props.easing,
		opacity: props.loaded ? 1 : 0,
		animation: props.loaded ? `materialize ${props.duration}ms 1 ${props.easing}` : '',
		...(Boolean(props.shift) && props.shiftStyles),
	})),
);

const MuiImageWrapper = React.memo(
	styled('div', {
		shouldForwardProp: (prop) =>
			checkProps(prop.toString(), ['bgColor', 'sx', 'rootHeight', 'rootWidth']),
	})<{
		bgColor?: React.CSSProperties['backgroundColor'];
		rootHeight?: React.CSSProperties['height'];
		rootWidth?: React.CSSProperties['width'];
	}>((props) => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: props.bgColor,
		height: props.rootHeight,
		width: props.rootWidth,
	})),
);

const MuiImageIconWrapper = React.memo(
	styled('div', {
		shouldForwardProp: (prop) => prop !== 'loaded',
	})<{ loaded: boolean }>((props) => ({
		width: '100%',
		marginLeft: '-100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: props.loaded ? 0 : 1,
	})),
);

export default Image;
