import * as React from 'react';
import { OverrideProps, OverridableComponent, OverridableTypeMap } from '@mui/types';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * Based on MUI component types in @mui/material-next,
 * Some of these props are directly copied from @types/mui-image.
 *
 * Below is the notice included in @types/mui-image:
 *
 * Type definitions for mui-image 1.0
 *
 * Project: https://github.com/benmneb/mui-image
 *
 * Definitions by: benmneb <https://github.com/benmneb>
 *
 * Definitions: https://github.com/DefinitelyTyped/mui-image
 *
 * (With a little help from Natalia <https://github.com/CodeMeNatalie>)
 *
 * All types packages by DefinitelyTyped licensed under MIT License.
 */

export type ImageTypeMap<P = {}, D extends React.ElementType = 'img'> = {
	props: P & {
		/**
		 * Text description of the image.
		 */
		alt?: string;
		/**
		 * Color the image transitions in from.
		 */
		bgColor?: React.CSSProperties['backgroundColor'];
		/**
		 * ClassName for the component image root element.
		 */
		className?: string;
		/**
		 * CSS length value for the shift animation.
		 */
		distance?: string | number;
		/**
		 * CSS transition-duration value.
		 * Duration of the transition when the image finishes loading.
		 */
		duration?: number;
		/**
		 * CSS transition-timing-function value.
		 * Easing function for the transition when the image finishes loading.
		 */
		easing?: React.CSSProperties['transitionTimingFunction'];
		/**
		 * Display default error icon or a custom one.
		 */
		errorIcon?: boolean | React.ReactElement;
		/**
		 * CSS object-fit value.
		 * Specifies how the image should be resized to fit within its container.
		 */
		fit?: React.CSSProperties['objectFit'];
		/**
		 * ClassName for the icon wrapper.
		 */
		iconWrapperClassName?: string;
		/**
		 * Inline styles for the icon wrapper.
		 */
		iconWrapperStyle?: React.CSSProperties;
		onError?: (...args: any[]) => void;
		onLoad?: (...args: any[]) => void;
		/**
		 * CSS position value.
		 * Specifies the positioning of the image within its container.
		 */
		position?: React.CSSProperties['position'];
		/**
		 * Direction for the shift animation.
		 */
		shift?: 'left' | 'right' | 'top' | 'bottom' | false | null;
		/**
		 * Duration of the shift animation in milliseconds.
		 */
		shiftDuration?: number;
		/**
		 * Display default loading spinner or a custom one.
		 */
		showLoading?: boolean | React.ReactElement;
		/**
		 * Path to the image.
		 * Should be a valid URL or file path to the image.
		 */
		src: string;
		/**
		 * Inline styles for the component image root element.
		 */
		style?: React.CSSProperties;
		/**
		 * The className for the root wrapper.
		 */
		wrapperClassName?: string;
		/**
		 * Inline styles for the root wrapper.
		 */
		wrapperStyle?: React.CSSProperties;
		/**
		 * Defining system overrides as well as additional CSS styles.
		 * Works same as official MUI components.
		 */
		sx?: SxProps<Theme>;
	};
	defaultComponent: D;
};

/**
 * A custom image component that satisfy the Material guidelines for loading images.
 *
 * Fork by mddanish00. Original by benmneb.
 *
 * API: https://github.com/mddanish00/mui-image/blob/master/README.md
 */
export type MuiImage<M extends OverridableTypeMap> = OverridableComponent<M>;

export type ImageProps<
	D extends React.ElementType = ImageTypeMap['defaultComponent'],
	P = {},
> = OverrideProps<ImageTypeMap<P, D>, D>;
