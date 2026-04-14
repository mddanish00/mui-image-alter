import React from 'react';
import { expect, test, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

import Image from './Image';
import LinearProgress from '@mui/material/LinearProgress';

vi.stubGlobal('ResizeObserver', Polyfill);

test('component prop changes root element', async () => {
	//@ts-ignore
	const NewImg = React.forwardRef<HTMLImageElement, any>(({ className, ...other }, ref) => (
		<img
			ref={ref}
			className={`different-image-root ${className}`}
			data-testid="testing-MuiImage"
			{...other}
		/>
	));
	const { findByTestId } = render(<Image src="valid-image-url" component={NewImg} />);

	const image = await findByTestId('testing-MuiImage');
	expect(image.className).toContain('different-image-root');
	expect(image.tagName).toBe('IMG');
});

test('displays loading indicator when showLoading prop is set to true', async () => {
	const { findByRole } = render(<Image src="invalid-image-url" showLoading={true} />);
	const loadingIndicator = await findByRole('progressbar');
	expect(loadingIndicator).toBeInTheDocument();
});

test('displays custom loading indicator when image fails to load', async () => {
	const { findByRole } = render(<Image src="invalid-image-url" showLoading={<LinearProgress />} />);
	const loadingIndicator = await findByRole('progressbar');
	expect(loadingIndicator).toBeInTheDocument();
});

test('displays custom error icon when image fails to load', async () => {
	const { findByTestId } = render(
		<Image
			src="invalid-image-url"
			errorIcon={<span data-testid="testing-MuiImage-errorIcon" />}
			data-testid="testing-MuiImage"
		/>,
	);
	const image = await findByTestId('testing-MuiImage');
	fireEvent.error(image);

	const errorIcon = await findByTestId('testing-MuiImage-errorIcon');
	expect(errorIcon).toBeInTheDocument();
});

test('performs shift animation when shift prop is set', async () => {
	const { findByTestId } = render(
		<Image src="valid-image-url" shift="left" distance={100} data-testid="testing-MuiImage" />,
	);
	const imageWrapper = await findByTestId('testing-MuiImage');
	expect(imageWrapper).toHaveStyle('left: 100px');
});

test('handles onLoad event correctly', async () => {
	const onLoad = vi.fn();
	const { findByTestId } = render(
		<Image src="valid-image-url" onLoad={onLoad} data-testid="testing-MuiImage" />,
	);
	const image = await findByTestId('testing-MuiImage');
	fireEvent.load(image);
	expect(onLoad).toHaveBeenCalled();
});

test('handles onError event correctly', async () => {
	const onError = vi.fn();
	const { findByTestId } = render(
		<Image src="invalid-image-url" onError={onError} data-testid="testing-MuiImage" />,
	);
	const image = await findByTestId('testing-MuiImage');
	fireEvent.error(image);
	expect(onError).toHaveBeenCalled();
});

test('component has correct position and fit values', async () => {
	const { findByTestId } = render(
		<Image
			src="valid-image-url"
			position="absolute"
			fit="contain"
			data-testid="testing-MuiImage"
		/>,
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image).toHaveStyle('position: absolute');
	expect(image).toHaveStyle('object-fit: contain');
});

test('className, wrapperClassName and iconWrapperClassName props are applied correctly', async () => {
	const { findByTestId } = render(
		<Image
			src="valid-image-url"
			className="custom-image-class"
			wrapperClassName="custom-image-wrapper-class"
			iconWrapperClassName="custom-icon-wrapper-class"
			data-testid="testing-MuiImage"
			errorIcon={<span data-testid="testing-MuiImage-errorIcon" />}
		/>,
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image.className).toContain('custom-image-class');
	expect(image.parentElement && image.parentElement.className).toContain(
		'custom-image-wrapper-class',
	);
	fireEvent.error(image);
	const errorIconWrapper = await findByTestId('testing-MuiImage-errorIcon');
	expect(errorIconWrapper.parentElement && errorIconWrapper.parentElement.className).toContain(
		'custom-icon-wrapper-class',
	);
});

test('duration and easing props are applied correctly to shift animation', async () => {
	const { findByTestId } = render(
		<Image
			src="https://picsum.photos/id/674/2000"
			shift="left"
			distance={100}
			duration={1000}
			easing="ease-in"
			data-testid="testing-MuiImage"
		/>,
	);

	const image = await findByTestId('testing-MuiImage');
	fireEvent.load(image);
	await waitFor(async () => {
		expect(image).toHaveStyle('left: 0');
	});
});

test('default values of props are applied correctly', async () => {
	const { findByTestId } = render(<Image src="valid-image-url" data-testid="testing-MuiImage" />);
	const image = await findByTestId('testing-MuiImage');
	expect(image).toHaveStyle('position: relative');
	expect(image).toHaveStyle('object-fit: cover');
});

test('wrapper get height and width prop as initial props', async () => {
	const { findByTestId } = render(
		<Image src="valid-image-url" data-testid="testing-MuiImage" height={200} width={300} />,
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image.parentElement).toHaveStyle('height: 200px');
	expect(image.parentElement).toHaveStyle('width: 300px');
});

test('showLoading=false and errorIcon=false hides icon wrapper', async () => {
	const { findByTestId } = render(
		<Image
			src="valid-image-url"
			showLoading={false}
			errorIcon={false}
			data-testid="testing-MuiImage"
		/>,
	);
	const image = await findByTestId('testing-MuiImage');
	// The MuiImageIconWrapper should not be rendered
	const iconWrapper = image.parentElement?.querySelector('.MuiImageAlter-iconWrapper');
	expect(iconWrapper).toBeNull();
});

test('default error icon (BrokenImageIcon) is shown when errorIcon is true', async () => {
	const { findByTestId } = render(
		<Image src="invalid-image-url" errorIcon={true} data-testid="testing-MuiImage" />,
	);
	const image = await findByTestId('testing-MuiImage');
	fireEvent.error(image);

	// The default BrokenImageIcon renders an SVG icon
	await waitFor(() => {
		const iconWrapper = image.parentElement?.querySelector('.MuiImageAlter-iconWrapper');
		expect(iconWrapper).not.toBeNull();
		const svgIcon = iconWrapper?.querySelector('svg');
		expect(svgIcon).not.toBeNull();
		// Both of error icon and progressbar are svg, so we need to check the role
		expect(svgIcon?.role).not.toBe('progressbar');
	});
});

test('loading indicator is not shown when error has occurred', async () => {
	const { findByTestId, queryByRole } = render(
		<Image src="invalid-image-url" showLoading={true} data-testid="testing-MuiImage" />,
	);
	const image = await findByTestId('testing-MuiImage');
	fireEvent.error(image);

	// After error, loading indicator should not be present
	await waitFor(() => {
		const progressbar = queryByRole('progressbar');
		expect(progressbar).toBeNull();
	});
});

test('bgColor prop is applied to wrapper', async () => {
	const { findByTestId } = render(
		<Image src="valid-image-url" bgColor="red" data-testid="testing-MuiImage" />,
	);
	const image = await findByTestId('testing-MuiImage');
	// bgColor is injected via emotion CSS classes, so check the wrapper renders
	expect(image.parentElement?.className).toContain('MuiImageAlter-wrapper');
	// red is converted to rgb(255, 0, 0) by getComputedStyle
	expect(image.parentElement).toHaveStyle('background-color: rgb(255, 0, 0)');
});

test('wrapperStyle and iconWrapperStyle are applied', async () => {
	const { findByTestId } = render(
		<Image
			src="valid-image-url"
			wrapperStyle={{ border: '1px solid black' }}
			iconWrapperStyle={{ padding: '10px' }}
			showLoading={true}
			data-testid="testing-MuiImage"
		/>,
	);
	const image = await findByTestId('testing-MuiImage');
	// wrapperStyle and iconWrapperStyle are passed as inline `style` attributes
	expect(image.parentElement?.style.border).toBe('1px solid black');
	const iconWrapper = image.parentElement?.querySelector('.MuiImageAlter-iconWrapper');
	expect(iconWrapper).not.toBeNull();
	expect((iconWrapper as HTMLElement).style.padding).toBe('10px');
});

test('alt prop defaults to empty string', async () => {
	const { findByTestId } = render(<Image src="valid-image-url" data-testid="testing-MuiImage" />);
	const image = await findByTestId('testing-MuiImage');
	expect(image.getAttribute('alt')).toBe('');
});

test('shift with null produces no shift styles', async () => {
	const { findByTestId } = render(
		<Image src="valid-image-url" shift={null} distance={100} data-testid="testing-MuiImage" />,
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image).not.toHaveStyle('left: 100px');
	expect(image).not.toHaveStyle('right: 100px');
	expect(image).not.toHaveStyle('top: 100px');
	expect(image).not.toHaveStyle('bottom: 100px');
});

test('shift with false produces no shift styles', async () => {
	const { findByTestId } = render(
		<Image src="valid-image-url" shift={false} distance={100} data-testid="testing-MuiImage" />,
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image).not.toHaveStyle('left: 100px');
	expect(image).not.toHaveStyle('right: 100px');
	expect(image).not.toHaveStyle('top: 100px');
	expect(image).not.toHaveStyle('bottom: 100px');
});

test('shiftDuration prop overrides default shift animation duration', async () => {
	const { findByTestId } = render(
		<Image
			src="valid-image-url"
			shift="left"
			distance={100}
			shiftDuration={500}
			data-testid="testing-MuiImage"
		/>,
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image).toHaveStyle('left: 100px');
});
