import React, { useState } from 'react';
import { Text, Box } from 'ink';

const CustomSpinner = () => {
  const [frameIndex, setFrameIndex] = useState(0);
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

  setTimeout(() => {
    setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
  }, 80);

  return (
    <Box>
      <Text color="cyan">{frames[frameIndex]}</Text>
      <Text> Loading...</Text>
    </Box>
  );
};

export default CustomSpinner;
