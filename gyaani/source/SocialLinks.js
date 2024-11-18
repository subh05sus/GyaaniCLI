// source/components/SocialLinks.js
import React from 'react';
import { Box, Text } from 'ink';

export const userLinks = {
  Mail: "mailto:sahasubhadip54@gmail.com",
  Github: "https://github.com/subh05sus",
  Twitter: "https://twitter.com/SubhadipDev",
  Linkedin: "https://www.linkedin.com/in/subhadipsahaofficial",
  Instagram: "https://www.instagram.com/subh05sus_",
  Facebook: "https://www.facebook.com/subhadipsahaofficial/",
  Linktree: "https://linktr.ee/subhadipsaha",
  YouTube: "https://www.youtube.com/@subhSUS",
};

const SocialLinks = () => (
  <Box flexDirection="column">
    <Text bold color="green" backgroundColor="black">
      Connect with me
    </Text>
    {Object.entries(userLinks).map(([name, url]) => (
      <Text key={name}>
        {name}: <Text color="blue">{url}</Text>
      </Text>
    ))}
  </Box>
);

export default SocialLinks;
