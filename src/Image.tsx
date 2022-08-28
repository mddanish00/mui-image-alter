import React from 'react';

import { styled } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress';

const BrokenImageIcon = (props: SvgIconProps) => (
	<SvgIcon {...props}>
		<path d="M21 5v6.59l-2.29-2.3c-.39-.39-1.03-.39-1.42 0L14 12.59 10.71 9.3a.9959.9959 0 0 0-1.41 0L6 12.59 3 9.58V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l2.29 2.29c.39.39 1.02.39 1.41 0l3.3-3.3 3.29 3.29c.39.39 1.02.39 1.41 0l3.3-3.28z" />
	</SvgIcon>
);

const Image = (props: MuiImageProps) => {
	const {
		src,
		alt = '',
		height = '100%',
		width = '100%',
		position = 'relative',
		fit = 'cover',
		style,
		className = '',
		showLoading = false,
		errorIcon = true,
		shift = false,
		distance = 100,
		shiftDuration = null,
		bgColor = 'inherit',
		wrapperStyle,
		iconWrapperStyle,
		imgClassName = '',
		iconWrapperClassName = '',
		duration = 3000,
		easing = 'cubic-bezier(0.7, 0, 0.6, 1)', // "heavy move" from https://sprawledoctopus.com/easing/,
		onLoad: onLoadProp,
		onError: onErrorProp,
		...rest
	} = props;

	const [loaded, setLoaded] = React.useState(false);
	const [error, setError] = React.useState(false);

	const handleLoad = () => {
		setLoaded(true);
		setError(false);
		if (onLoadProp) onLoadProp();
	};

	const handleError = () => {
		setError(true);
		setLoaded(false);
		if (onErrorProp) onErrorProp();
	};

	const shiftStyles =
		shift !== undefined && shift !== false && shift !== null
			? {
					[shift]: loaded ? 0 : distance,
			  }
			: {};

	const Img = React.memo(
		styled('img')({
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
			position,
			width: '100%',
			height: '100%',
			objectFit: fit,
			transitionProperty: `${Boolean(shift) ? `${shift}, ` : ''}opacity`,
			transitionDuration: `${
				Boolean(shift) ? `${shiftDuration || duration * 0.3}ms, ` : ''
			}${duration / 2}ms`,
			transitionTimingFunction: easing,
			opacity: loaded ? 1 : 0,
			animation: loaded ? `materialize ${duration}ms 1 ${easing}` : '',
			...(Boolean(shift) && shiftStyles),
			...style,
		})
	);

	const MuiImageWrapper = React.memo(
		styled('div')({
			width,
			height,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: bgColor,
			...wrapperStyle,
		})
	);

	const MuiImageIconWrapper = React.memo(
		styled('div')({
			width: '100%',
			marginLeft: '-100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			opacity: loaded ? 0 : 1,
			...iconWrapperStyle,
		})
	);

	const showErrorIcon = (typeof errorIcon !== 'boolean' && errorIcon) || (
		<BrokenImageIcon style={{ fontSize: 56, color: '#bdbdbd' }} /> // MUI grey[400]
	);

	const loadingIndicator = (typeof showLoading !== 'boolean' &&
		showLoading) || <CircularProgress size={56} thickness={6} />;

	return (
		<MuiImageWrapper className={`mui-image-wrapper ${className}`}>
			<Img
				src={src}
				alt={alt}
				className={`mui-image-img ${imgClassName}`}
				onLoad={handleLoad}
				onError={handleError}
				{...rest}
			/>
			{(Boolean(showLoading) || Boolean(errorIcon)) && (
				<MuiImageIconWrapper
					className={`mui-image-iconWrapper ${iconWrapperClassName}`}
				>
					{Boolean(errorIcon) && error && showErrorIcon}
					{Boolean(showLoading) && !error && !loaded && loadingIndicator}
				</MuiImageIconWrapper>
			)}
		</MuiImageWrapper>
	);
};

export interface MuiImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	alt?: string;
	bgColor?: React.CSSProperties['backgroundColor'];
	className?: string;
	distance?: string | number;
	duration?: number;
	easing?: React.CSSProperties['transitionTimingFunction'];
	errorIcon?: boolean | React.ReactNode;
	fit?: React.CSSProperties['objectFit'];
	height?: React.CSSProperties['height'] | number;
	iconWrapperClassName?: string;
	iconWrapperStyle?: React.CSSProperties;
	onError?: (...args: any[]) => void;
	onLoad?: (...args: any[]) => void;
	position?: React.CSSProperties['position'];
	shift?: 'left' | 'right' | 'top' | 'bottom' | false | null;
	shiftDuration?: number;
	showLoading?: boolean | React.ReactNode;
	src: string;
	style?: React.CSSProperties;
	width?: React.CSSProperties['width'] | number;
	imgClassName?: string;
	wrapperStyle?: React.CSSProperties;
	title?: string;
}

export default Image;
