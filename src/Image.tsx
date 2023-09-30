import * as React from 'react';

import { styled } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress';

import clsx from 'clsx';

import { ImageProps, ImageTypeMap, MuiImage } from './Image.types';

const BrokenImageIcon = (props: SvgIconProps) => (
	<SvgIcon {...props}>
		<path d="M21 5v6.59l-2.29-2.3c-.39-.39-1.03-.39-1.42 0L14 12.59 10.71 9.3a.9959.9959 0 0 0-1.41 0L6 12.59 3 9.58V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l2.29 2.29c.39.39 1.02.39 1.41 0l3.3-3.3 3.29 3.29c.39.39 1.02.39 1.41 0l3.3-3.28z" />
	</SvgIcon>
);

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
		}: ImageProps<BaseComponentType>,
		ref: React.ForwardedRef<any>,
	) => {
		const [loaded, setLoaded] = React.useState(false);
		const [error, setError] = React.useState(false);

		const handleLoad = React.useCallback(() => {
			setLoaded(true);
			setError(false);
			if (onLoadProp) onLoadProp();
		}, [onLoadProp]);

		const handleError = React.useCallback(() => {
			setError(true);
			setLoaded(false);
			if (onErrorProp) onErrorProp();
		}, [onErrorProp]);

		const shiftStyles =
			shift !== undefined && shift !== false && shift !== null
				? {
						[shift]: loaded ? 0 : distance,
				  }
				: {};

		const showErrorIcon = (typeof errorIcon !== 'boolean' && errorIcon) || (
			<BrokenImageIcon sx={{ fontSize: 56, color: '#bdbdbd' }} /> // MUI grey[400]
		);

		const loadingIndicator = (typeof showLoading !== 'boolean' && showLoading) || (
			<CircularProgress size={56} thickness={6} />
		);

		return (
			<MuiImageWrapper
				className={clsx('mui-image-wrapper', wrapperClassName)}
				sx={sx}
				style={wrapperStyle}
				bgColor={bgColor}
			>
				<MuiImageRoot
					ref={ref}
					as={component}
					src={src}
					alt={alt}
					style={style}
					className={clsx('mui-image-img', className)}
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
						className={clsx('mui-image-iconWrapper', iconWrapperClassName)}
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
		shouldForwardProp: (prop) => checkProps(prop.toString(), ['bgColor', 'sx']),
	})<{
		bgColor?: React.CSSProperties['backgroundColor'];
	}>((props) => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: props.bgColor,
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
