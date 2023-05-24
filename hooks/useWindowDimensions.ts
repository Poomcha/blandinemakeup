import { useEffect, useState } from 'react';

interface useWindowDimensionsStateI {
  width: number;
  height: number;
}

const defaultDimensions = {
  width: 1200,
  height: 800,
};

export default function useWindowDimensions() {
  const [wDimensions, setWDimensions] =
    useState<useWindowDimensionsStateI>(defaultDimensions);

  const handleResize = () =>
    setWDimensions({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    setWDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return wDimensions;
}
