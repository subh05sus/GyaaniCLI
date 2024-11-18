import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

export default function Hero() {
    return (
        <Box flexDirection="column" alignItems="left">
            <Gradient name="atlas">
                <BigText text="Gyaani CLI" align="center" font="block" />
            </Gradient>
            <Box marginTop={1}>
                <Text color="cyan">Usage:</Text>
            </Box>
            <Box>
                <Text color="green">  $ gyaani [input]</Text>
            </Box>
            <Box marginTop={1}>
                <Text color="cyan">Options:</Text>
            </Box>
            <Box>
                <Text color="yellow">  --explain  </Text>
                <Text color="white">Explain a concept</Text>
            </Box>
            <Box>
                <Text color="yellow">  --github   </Text>
                <Text color="white">Show GitHub repository details</Text>
            </Box>
            <Box>
                <Text color="yellow">  --sysinfo  </Text>
                <Text color="white">Show system information</Text>
            </Box>
            <Box>
                <Text color="yellow">  --generate  </Text>
                <Text color="white">Generate an image from a prompt</Text>
            </Box>
            <Box>
                <Text color="yellow">  --help     </Text>
                <Text color="white">Show help</Text>
            </Box>
            <Box>
                <Text color="yellow">  --version  </Text>
                <Text color="white">Show version number</Text>
            </Box>
        </Box>
    );
}