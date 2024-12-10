import * as React from 'react';

const useResizeObserver = <T extends Element>({
	observeRef,
}: {
	observeRef: React.RefObject<T | null> | null | undefined;
}) => {
	const [height, setHeight] = React.useState<number>();
	const [width, setWidth] = React.useState<number>();

	const hookResizeObserverRef = React.useRef<ResizeObserver | undefined>(undefined);

	// Only initialize ResizeObserver once
	React.useEffect(() => {
		hookResizeObserverRef.current = new ResizeObserver((entries) => {
			setHeight(entries[0].contentRect.height);
			setWidth(entries[0].contentRect.width);
		});
	}, []);

	React.useEffect(() => {
		if (observeRef && observeRef.current && hookResizeObserverRef.current) {
			hookResizeObserverRef.current.observe(observeRef.current);
		}

		return () => {
			if (observeRef && observeRef.current && hookResizeObserverRef.current) {
				hookResizeObserverRef.current.unobserve(observeRef.current);
			}
		};
	}, [observeRef]);

	return { ref: observeRef, height, width };
};

export default useResizeObserver;
