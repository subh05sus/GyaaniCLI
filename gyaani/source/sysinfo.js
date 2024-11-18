import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import Spinner from 'ink-spinner';
import os from 'os';
import Image from 'ascii-art-image';

// Custom bordered box component
const BorderedBox = ({ children }) => (
    <Box borderStyle="round" borderColor="cyan">
        {children}
    </Box>
);
const getMaxTerminalWidth = () => process.stdout.columns || 40; // Default to 80 if not available

const SysInfo = () => {
    const [loading, setLoading] = useState(true);
    const [asciiArt, setAsciiArt] = useState('');
    const [systemInfo, setSystemInfo] = useState({});

    useEffect(() => {
        const fetchSystemInfo = () => {
            const info = {
                username: os.userInfo().username,
                homedir: os.userInfo().homedir,
                osType: os.type(),
                platform: os.platform(),
                uptime: os.uptime(),
                totalMemory: os.totalmem(),
                freeMemory: os.freemem(),
                cpu: os.cpus()[0].model,
                arch: os.arch(),
                hostname: os.hostname(),
                release: os.release(),
            };
            setSystemInfo(info);
        };

        const generateAsciiArt = async () => {
            try {
                const maxWidth = getMaxTerminalWidth() - 2; // Buffer for margins
                const image = new Image({
                    filepath: 'https://cdn-icons-png.flaticon.com/512/2289/2289363.png',
                    width: Math.min(maxWidth, 60),
                    alphabet: 'ultra-wide',
                });
        
                const art = await new Promise((resolve, reject) => {
                    image.write((err, rendered) => {
                        if (err) reject(err);
                        else resolve(rendered);
                    });
                });
        
                setAsciiArt(art);
            } catch (error) {
                console.error('Error generating ASCII art:', error);
            }
        };
        

        fetchSystemInfo();
        generateAsciiArt();
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Box flexDirection="column" alignItems="center">
                <Spinner type="dots" />
                <Text> Fetching system information...</Text>
            </Box>
        );
    }

    return (
        <Box flexDirection="column" alignItems="center">
            <Gradient name="atlas">
                <BigText text="System Info" font="block" />
            </Gradient>
            <Box flexDirection="row" gap={0.05} alignItems="flex-start" justifyContent="space-between">
                <Box marginRight={2}>
                    <Text>{asciiArt}</Text>
                </Box>
                <Box flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
                    <Box flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
                        <BorderedBox width="100%">
                            <Text>Username: {systemInfo.username}</Text>
                        </BorderedBox>
                        <BorderedBox width="100%">
                            <Text>Home Directory: {systemInfo.homedir}</Text>
                        </BorderedBox>
                        <BorderedBox width="100%">
                            <Text>OS Type: {systemInfo.osType}</Text>
                        </BorderedBox>
                        <BorderedBox width="100%">
                            <Text>Platform: {systemInfo.platform}</Text>
                        </BorderedBox>
                        <BorderedBox width="100%">
                            <Text>Uptime: {Math.floor(systemInfo.uptime / 60)} minutes</Text>
                        </BorderedBox>
                    </Box>
                    <Box flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
                        <BorderedBox width="100%">
                            <Text>Total Memory: {Math.floor(systemInfo.totalMemory / 1024 / 1024)} MB</Text>
                        </BorderedBox>
                        <BorderedBox width="100%">
                            <Text>Free Memory: {Math.floor(systemInfo.freeMemory / 1024 / 1024)} MB</Text>
                        </BorderedBox>
                        <BorderedBox width="100%">
                            <Text>CPU: {systemInfo.cpu}</Text>
                        </BorderedBox>
                        <BorderedBox width="100%">
                            <Text>Architecture: {systemInfo.arch}</Text>
                        </BorderedBox>
                        <BorderedBox width="100%">
                            <Text>Hostname: {systemInfo.hostname}</Text>
                        </BorderedBox>
                        <BorderedBox width="100%">
                            <Text>Release: {systemInfo.release}</Text>
                        </BorderedBox>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SysInfo;