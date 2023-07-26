import { RefObject, useEffect, useState } from 'react';
import useEventListener from './useEventListener';

interface ElementSize {
  width: number;
  height: number;
  computed?: boolean;
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>,
  listener?: (
    width: ElementSize['height'],
    height: ElementSize['height']
  ) => ElementSize
): ElementSize {
  const [elementSize, setElementSize] = useState<ElementSize>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    if (ref.current) {
      if (listener instanceof Function) {
        setElementSize(
          listener(ref.current?.clientWidth, ref.current?.clientHeight)
        );
      } else {
        setElementSize({
          width: ref.current?.clientWidth,
          height: ref.current?.clientHeight,
        });
      }
    }
  };

  useEffect(() => {
    if (ref.current) {
      if (listener instanceof Function) {
        setElementSize(
          listener(ref.current?.clientWidth, ref.current?.clientHeight)
        );
      } else {
        setElementSize({
          width: ref.current?.clientWidth,
          height: ref.current?.clientHeight,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  useEventListener('resize', handleResize);
  useEventListener('load', handleResize);

  return elementSize;
}

export default useElementSize;
