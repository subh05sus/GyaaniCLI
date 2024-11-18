import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import fetch from 'node-fetch';
import Image from 'ascii-art-image';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { promisify } from 'util';
import { pipeline } from 'stream';

const streamPipeline = promisify(pipeline);

// Helper function to get terminal width dynamically
const getMaxTerminalWidth = () => process.stdout.columns || 80; // Default to 80 if not available

const GenerateImage = ({ prompt }) => {
    const [loading, setLoading] = useState(true);
    const [asciiArt, setAsciiArt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showChoices, setShowChoices] = useState(false);

    useEffect(() => {
        const generateImage = async () => {
            try {
                setLoading(true);

                // Fetch generated image from API
                const response = await fetch(`${apiURL}/generate-image`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt }),
                });

                const data = await response.json();
                setImageUrl(data.image_url);

                // Generate ASCII Art with width based on terminal size
                const maxWidth = getMaxTerminalWidth() - 2; // Buffer for margins
                const image = new Image({
                    filepath: data.image_url,
                    width: Math.min(maxWidth, 120), // Cap to 120 characters max
                    alphabet: 'ultra-wide',
                });

                const art = await new Promise((resolve, reject) => {
                    image.write((err, rendered) => {
                        if (err) reject(err);
                        else resolve(rendered);
                    });
                });

                setAsciiArt(art);
                setShowChoices(true);
            } catch (error) {
                console.error('Error generating ASCII art:', error);
            } finally {
                setLoading(false);
            }
        };

        generateImage();
    }, [prompt]);

    const handleChoiceSelect = async (item) => {
        if (item.value === 'download') {
            try {
                const homeDir = os.homedir();
                const downloadsDir = path.join(homeDir, 'Downloads');
                const filePath = path.join(downloadsDir, 'generated-image.jpg');

                const response = await fetch(imageUrl);
                if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

                await streamPipeline(response.body, fs.createWriteStream(filePath));
                console.log(`Image saved to ${filePath}`);
            } catch (error) {
                console.error('Error downloading image:', error);
            }
            process.exit();
        } else if (item.value === 'regenerate') {
            setShowChoices(false);
            setLoading(true);
            const generateImage = async () => {
                try {
                    setLoading(true);
    
                    // Fetch generated image from API
                    const response = await fetch(`${apiURL}/generate-image`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt }),
                    });
    
                    const data = await response.json();
                    setImageUrl(data.image_url);
    
                    // Generate ASCII Art with width based on terminal size
                    const maxWidth = getMaxTerminalWidth() - 2; // Buffer for margins
                    const image = new Image({
                        filepath: data.image_url,
                        width: Math.min(maxWidth, 120), // Cap to 120 characters max
                        alphabet: 'ultra-wide',
                    });
    
                    const art = await new Promise((resolve, reject) => {
                        image.write((err, rendered) => {
                            if (err) reject(err);
                            else resolve(rendered);
                        });
                    });
    
                    setAsciiArt(art);
                    setShowChoices(true);
                } catch (error) {
                    console.error('Error generating ASCII art:', error);
                } finally {
                    setLoading(false);
                }
            };
            generateImage();
        } else if (item.value === 'cancel') {
            process.exit();
        }
    };

    const choices = [
        { label: 'Download', value: 'download' },
        { label: 'Regenerate', value: 'regenerate' },
        { label: 'Cancel', value: 'cancel' },
    ];

    if (loading) {
        return (
            <Box>
                <Spinner type="dots" />
                <Text> Generating image and converting to ASCII art...</Text>
            </Box>
        );
    }

    return (
        <Box flexDirection="column">
            <Box>
                <Text>{asciiArt}</Text>
            </Box>
            {showChoices && (
                <Box flexDirection="column">
                    <Text>Do you want to download this ASCII art?</Text>
                    <SelectInput items={choices} onSelect={handleChoiceSelect} />
                </Box>
            )}
        </Box>
    );
};

export default GenerateImage;