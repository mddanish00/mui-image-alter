import React from 'react';
import { expect, test, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Image from './Image';
import LinearProgress from '@mui/material/LinearProgress';

test('component prop changes root element', async () => {
	const { findByTestId } = render(
		<Image
			src="valid-image-url"
			component={() => (
				<img className="different-image-root" data-testid="testing-MuiImage" />
			)}
		/>
	);

	const image = await findByTestId('testing-MuiImage');
	expect(image.className).toContain('different-image-root');
	expect(image.tagName).toBe('IMG');
});

test('displays loading indicator when showLoading prop is set to true', async () => {
	const { findByRole } = render(<Image src="" showLoading={true} />);
	const loadingIndicator = await findByRole('progressbar');
	expect(loadingIndicator).toBeInTheDocument();
});

test('displays custom loading indicator when image fails to load', async () => {
	const { findByRole } = render(
		<Image src="" showLoading={<LinearProgress />} />
	);
	const loadingIndicator = await findByRole('progressbar');
	expect(loadingIndicator).toBeInTheDocument();
});

test('displays custom error icon when image fails to load', async () => {
	const { findByTestId } = render(
		<Image
			src="invalid-image-url"
			errorIcon={<span data-testid="testing-MuiImage-errorIcon" />}
			data-testid="testing-MuiImage"
		/>
	);
	const image = await findByTestId('testing-MuiImage');
	fireEvent.error(image);

	const errorIcon = await findByTestId('testing-MuiImage-errorIcon');
	expect(errorIcon).toBeInTheDocument();
});

test('performs shift animation when shift prop is set', async () => {
	const { findByTestId } = render(
		<Image
			src="valid-image-url"
			shift="left"
			distance={100}
			data-testid="testing-MuiImage"
		/>
	);
	const imageWrapper = await findByTestId('testing-MuiImage');
	expect(imageWrapper).toHaveStyle('left: 100px');
});

test('handles onLoad event correctly', async () => {
	const onLoad = vi.fn();
	const { findByTestId } = render(
		<Image
			src="valid-image-url"
			onLoad={onLoad}
			data-testid="testing-MuiImage"
		/>
	);
	const image = await findByTestId('testing-MuiImage');
	fireEvent.load(image);
	expect(onLoad).toHaveBeenCalled();
});

test('handles onError event correctly', async () => {
	const onError = vi.fn();
	const { findByTestId } = render(
		<Image
			src="invalid-image-url"
			onError={onError}
			data-testid="testing-MuiImage"
		/>
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
		/>
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image).toHaveStyle('position: absolute');
	expect(image).toHaveStyle('object-fit: contain');
});

test('imgClassName and iconWrapperClassName props are applied correctly', async () => {
	const { findByTestId } = render(
		<Image
			src="valid-image-url"
			imgClassName="custom-image-class"
			iconWrapperClassName="custom-icon-wrapper-class"
			data-testid="testing-MuiImage"
			errorIcon={<span data-testid="testing-MuiImage-errorIcon" />}
		/>
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image.className).toContain('custom-image-class');
	fireEvent.error(image);
	const errorIconWrapper = await findByTestId('testing-MuiImage-errorIcon');
	expect(
		errorIconWrapper.parentElement && errorIconWrapper.parentElement.className
	).toContain('custom-icon-wrapper-class');
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
		/>
	);
	
	const image = await findByTestId('testing-MuiImage');
	fireEvent.load(image);
	await waitFor(async () => {
		expect(image).toHaveStyle('left: 0');
	});
});

test('default values of props are applied correctly', async () => {
	const { findByTestId } = render(
		<Image src="valid-image-url" data-testid="testing-MuiImage" />
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image).toHaveStyle('position: relative');
	expect(image).toHaveStyle('object-fit: cover');
});

test('ref is forwarded properly', async () => {
	const ref = React.createRef<HTMLImageElement>();
	const { findByTestId } = render(
		<Image src="valid-image-url" ref={ref} data-testid="testing-MuiImage" />
	);
	const image = await findByTestId('testing-MuiImage');
	expect(image).toEqual(ref.current);
});
