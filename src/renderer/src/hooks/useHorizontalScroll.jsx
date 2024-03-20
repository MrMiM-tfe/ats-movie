import { useEffect, useRef } from 'react';

const useHorizontalScroll = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
  
    if (!container) return

    const handleScroll = (event) => {
      if (event.target.parentElement.className !== "image" && event.target.className !== "list") return
      if (event.deltaX !== 0) return
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    };

    container.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return containerRef;
};

export default useHorizontalScroll;
