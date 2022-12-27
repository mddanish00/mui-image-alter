import * as React from 'react';
import {
  OverrideProps,
  OverridableComponent,
  OverridableTypeMap,
} from '@mui/types';
import { SxProps, Theme } from '@mui/material/styles';

/*
Based on how component types in @mui/material-next,
Some of these props are directly copied from @types/mui-image
Type definitions for mui-image 1.0
Project: https://github.com/benmneb/mui-image
Definitions by: benmneb <https://github.com/benmneb>
Definitions: https://github.com/DefinitelyTyped/mui-image
(With a little help from Natalia <https://github.com/CodeMeNatalie>)
Licensed under MIT License.
*/
export type ImageTypeMap<P = {}, D extends React.ElementType = 'img'> = {
  props: P & {
    alt?: string;
	bgColor?: React.CSSProperties['backgroundColor'];
	className?: string;
	distance?: string | number;
	duration?: number;
	easing?: React.CSSProperties['transitionTimingFunction'];
	errorIcon?: boolean | React.ReactElement;
	fit?: React.CSSProperties['objectFit'];
	iconWrapperClassName?: string;
	iconWrapperStyle?: React.CSSProperties;
	onError?: (...args: any[]) => void;
	onLoad?: (...args: any[]) => void;
	position?: React.CSSProperties['position'];
	shift?: 'left' | 'right' | 'top' | 'bottom' | false | null;
	shiftDuration?: number;
	showLoading?: boolean | React.ReactElement;
	src: string;
	style?: React.CSSProperties;
	imgClassName?: string;
	wrapperStyle?: React.CSSProperties;
	title?: string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
};


export type MuiImage<M extends OverridableTypeMap> = OverridableComponent<ImageTypeMap>;

export type ImageProps<
  D extends React.ElementType = ImageTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ImageTypeMap<P, D>, D>;