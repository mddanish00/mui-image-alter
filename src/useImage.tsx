import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import useResizeObserver from 'use-resize-observer';

const useImage = (
	componentRef: React.ForwardedRef<any>,
	shift: 'left' | 'right' | 'top' | 'bottom' | false | null,
	distance: string | number,
	errorIcon: boolean | React.ReactElement,
	showLoading: boolean | React.ReactElement,
	explicitHeight?: number,
	explicitWidth?: number,
	onLoadProp?: (...args: any[]) => void,
	onErrorProp?: (...args: any[]) => void,
): {
	loaded: boolean;
	error: boolean;
	observedRef: React.RefCallback<any>;
	currentHeight: number | undefined;
	currentWidth: number | undefined;
	initialHeight: React.CSSProperties['height'];
	initialWidth: React.CSSProperties['width'];
	handleLoad: () => void;
	handleError: () => void;
	showErrorIcon: JSX.Element;
	loadingIndicator: JSX.Element;
	shiftStyles: {
		[x: string]: string | number;
	};
} => {
	const [loaded, setLoaded] = React.useState(false);
	const [error, setError] = React.useState(false);

	const {
		ref: observedRef,
		width: currentWidth,
		height: currentHeight,
	} = useResizeObserver<any>({ ref: componentRef });

	const initialHeight: React.CSSProperties['height'] = explicitHeight ? explicitHeight : '100%';
	const initialWidth: React.CSSProperties['width'] = explicitWidth ? explicitWidth : '100%';

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
			? { [shift]: loaded ? 0 : distance }
			: {};

	const showErrorIcon = (typeof errorIcon !== 'boolean' && errorIcon) || (
		<BrokenImageIcon sx={{ fontSize: 56, color: '#bdbdbd' }} /> // MUI grey[400]
	);

	const loadingIndicator = (typeof showLoading !== 'boolean' && showLoading) || (
		<CircularProgress size={56} thickness={6} />
	);

	return {
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
	};
};

const BrokenImageIcon = (props: SvgIconProps) => (
	<SvgIcon {...props}>
		<path d="M21 5v6.59l-2.29-2.3c-.39-.39-1.03-.39-1.42 0L14 12.59 10.71 9.3a.9959.9959 0 0 0-1.41 0L6 12.59 3 9.58V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l2.29 2.29c.39.39 1.02.39 1.41 0l3.3-3.3 3.29 3.29c.39.39 1.02.39 1.41 0l3.3-3.28z" />
	</SvgIcon>
);

export default useImage;
