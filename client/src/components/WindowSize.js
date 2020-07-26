/*
 * WindowSize.js
 *
 * Determines the width and height of the window.
 *
 * Author: Luis Love
*/

import { useState, useLayoutEffect } from 'react';


export default function WindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
        setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
