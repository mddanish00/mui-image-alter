import React from 'react';

import styled from '@mui/material/styles/styled';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps, Theme } from '@mui/material/styles';

const BrokenImageIcon = (props: SvgIconProps) => (
	<SvgIcon {...props}>
		<path d="M21 5v6.59l-2.29-2.3c-.39-.39-1.03-.39-1.42 0L14 12.59 10.71 9.3a.9959.9959 0 0 0-1.41 0L6 12.59 3 9.58V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l2.29 2.29c.39.39 1.02.39 1.41 0l3.3-3.3 3.29 3.29c.39.39 1.02.39 1.41 0l3.3-3.28z" />
	</SvgIcon>
);

const Image = React.forwardRef<HTMLImageElement, MuiImageProps>(
	(
		{
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
			shiftDuration = undefined,
			bgColor = 'inherit',
			wrapperStyle,
			iconWrapperStyle,
			imgClassName = '',
			iconWrapperClassName = '',
			duration = 3000,
			easing = 'cubic-bezier(0.7, 0, 0.6, 1)', // "heavy move" from https://sprawledoctopus.com/easing/,
			onLoad: onLoadProp,
			onError: onErrorProp,
			sx,
			...rest
		}: MuiImageProps,
		ref
	) => {
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

		const showErrorIcon = (typeof errorIcon !== 'boolean' && errorIcon) || (
			<BrokenImageIcon style={{ fontSize: 56, color: '#bdbdbd' }} /> // MUI grey[400]
		);

		const loadingIndicator = (typeof showLoading !== 'boolean' &&
			showLoading) || <CircularProgress size={56} thickness={6} />;

		return (
			<MuiImageWrapper
				className={buildName('mui-image-wrapper', className)}
				sx={sx}
				style={wrapperStyle}
				bgColor={bgColor}
			>
				<Img
					ref={ref}
					src={src}
					alt={alt}
					width={width}
					height={height}
					style={style}
					className={buildName('mui-image-img', imgClassName)}
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
						className={buildName('mui-image-iconWrapper', iconWrapperClassName)}
						style={iconWrapperStyle}
						loaded={loaded}
					>
						{Boolean(errorIcon) && error && showErrorIcon}
						{Boolean(showLoading) && !error && !loaded && loadingIndicator}
					</MuiImageIconWrapper>
				)}
			</MuiImageWrapper>
		);
	}
);

// Utility functions
const checkProps = (value: string, arr: string[]) => !arr.includes(value);
const buildName = (base: string, append: string) =>
	base.concat(append ? ` ${append}` : '');

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
const Img = React.memo(
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
		transitionProperty: `${
			Boolean(props.shift) ? `${props.shift}, ` : ''
		}opacity`,
		transitionDuration: `${
			Boolean(props.shift)
				? `${props.shiftDuration || props.duration * 0.3}ms, `
				: ''
		}${props.duration / 2}ms`,
		transitionTimingFunction: props.easing,
		opacity: props.loaded ? 1 : 0,
		animation: props.loaded
			? `materialize ${props.duration}ms 1 ${props.easing}`
			: '',
		...(Boolean(props.shift) && props.shiftStyles),
	}))
);

const MuiImageWrapper = React.memo(
	styled('div', {
		shouldForwardProp: (prop) => prop !== 'bgColor',
	})<{
		bgColor?: React.CSSProperties['backgroundColor'];
	}>((props) => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: props.bgColor,
	}))
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
	}))
);

/*Based on @types/mui-images with some my own modification
Type definitions for mui-image 1.0
Project: https://github.com/benmneb/mui-image
Definitions by: benmneb <https://github.com/benmneb>
Definitions: https://github.com/DefinitelyTyped/mui-image
(With a little help from Natalia <https://github.com/CodeMeNatalie>)
Licensed under MIT License.*/
export interface MuiImageProps
	extends React.ImgHTMLAttributes<HTMLImageElement> {
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
	sx?: SxProps<Theme>;
}

export default Image;
