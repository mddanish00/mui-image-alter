import { expect, test, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useResizeObserver from './useResizeObserver';

// Store the ResizeObserver callback so we can invoke it manually
let resizeObserverCallback: ResizeObserverCallback;
let mockObserve: ReturnType<typeof vi.fn>;
let mockUnobserve: ReturnType<typeof vi.fn>;
let mockDisconnect: ReturnType<typeof vi.fn>;

beforeEach(() => {
	mockObserve = vi.fn();
	mockUnobserve = vi.fn();
	mockDisconnect = vi.fn();

	const MockResizeObserver = vi.fn(
		class {
			constructor(callback: ResizeObserverCallback) {
				resizeObserverCallback = callback;
			}
			observe = mockObserve;
			unobserve = mockUnobserve;
			disconnect = mockDisconnect;
		},
	);

	vi.stubGlobal('ResizeObserver', MockResizeObserver);
});

afterEach(() => {
	vi.unstubAllGlobals();
});

test('returns undefined height and width initially', () => {
	const observeRef = { current: document.createElement('div') };
	const { result } = renderHook(() => useResizeObserver<HTMLDivElement>({ observeRef }));

	expect(result.current.height).toBeUndefined();
	expect(result.current.width).toBeUndefined();
});

test('calls observe when a valid ref is provided', () => {
	const element = document.createElement('div');
	const observeRef = { current: element };
	renderHook(() => useResizeObserver<HTMLDivElement>({ observeRef }));

	expect(mockObserve).toHaveBeenCalledWith(element);
});

test('calls unobserve on unmount', () => {
	const element = document.createElement('div');
	const observeRef = { current: element };
	const { unmount } = renderHook(() => useResizeObserver<HTMLDivElement>({ observeRef }));

	unmount();

	expect(mockUnobserve).toHaveBeenCalledWith(element);
});

test('updates height and width when ResizeObserver fires', () => {
	const observeRef = { current: document.createElement('div') };
	const { result } = renderHook(() => useResizeObserver<HTMLDivElement>({ observeRef }));

	act(() => {
		resizeObserverCallback(
			[
				{
					contentRect: { height: 200, width: 300 } as DOMRectReadOnly,
				} as ResizeObserverEntry,
			],
			{} as ResizeObserver,
		);
	});

	expect(result.current.height).toBe(200);
	expect(result.current.width).toBe(300);
});

test('does not observe when observeRef is null', () => {
	renderHook(() => useResizeObserver<HTMLDivElement>({ observeRef: null }));

	expect(mockObserve).not.toHaveBeenCalled();
});

test('does not observe when observeRef is undefined', () => {
	renderHook(() => useResizeObserver<HTMLDivElement>({ observeRef: undefined }));

	expect(mockObserve).not.toHaveBeenCalled();
});

test('does not unobserve when observeRef is null on unmount', () => {
	const { unmount } = renderHook(() => useResizeObserver<HTMLDivElement>({ observeRef: null }));

	unmount();

	expect(mockUnobserve).not.toHaveBeenCalled();
});

test('returns the same ref that was passed in', () => {
	const observeRef = { current: document.createElement('div') };
	const { result } = renderHook(() => useResizeObserver<HTMLDivElement>({ observeRef }));

	expect(result.current.ref).toBe(observeRef);
});
