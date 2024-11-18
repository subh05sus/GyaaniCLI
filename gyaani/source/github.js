import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import fetch from 'node-fetch';
import { exec } from 'child_process';
import path from 'path';

const GitHub = ({ repoUrl }) => {
    const [loading, setLoading] = useState(true);
    const [repoDetails, setRepoDetails] = useState(null);
    const [clonePath, setClonePath] = useState('');
    const [showChoices, setShowChoices] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editCommand, setEditCommand] = useState('');

    useEffect(() => {
        const fetchRepoDetails = async () => {
            setLoading(true);
            try {
                const apiUrl = repoUrl.replace('https://github.com/', 'https://api.github.com/repos/');
                const response = await fetch(apiUrl);
                const data = await response.json();
                setRepoDetails(data);
                setShowChoices(true);
            } catch (error) {
                console.error('Error fetching repository details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepoDetails();
    }, [repoUrl]);

    const handleChoiceSelect = (item) => {
        if (item.value === 'clone') {
            setShowChoices(false);
            setIsEditing(true);
        } else if (item.value === 'cancel') {
            process.exit();
        }
    };

    const handleEditSubmit = (path) => {
        const command = `git clone ${repoUrl} ${path}\\${repoUrl.split('/')[repoUrl.split('/').length - 2]}`;
        exec(command, (error) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            process.exit();
        });
    };

    const choices = [
        { label: 'Clone', value: 'clone' },
        { label: 'Cancel', value: 'cancel' },
    ];

    if (loading) {
        return (
            <Box>
                <Spinner type="dots" />
                <Text> Fetching repository details...</Text>
            </Box>
        );
    }

    return (
        <Box flexDirection="column">
            {repoDetails && (
                <Box flexDirection="column">
                    <Text color="white">Repository: <Text color="cyan">{repoDetails.full_name}</Text></Text>
                    <Text color="white">Description: <Text color="cyan">{repoDetails.description}</Text></Text>
                    <Text color="white">Stars: <Text color="cyan">{repoDetails.stargazers_count}</Text></Text>
                    <Text color="white">Forks: <Text color="cyan">{repoDetails.forks_count}</Text></Text>
                    <Text color="white">Open Issues: <Text color="cyan">{repoDetails.open_issues_count}</Text></Text>
                </Box>
            )}
            {showChoices && (
                <Box flexDirection="column">
                    <Text color="yellow">Do you want to clone this repository?</Text>
                    <SelectInput items={choices} onSelect={handleChoiceSelect} />
                </Box>
            )}
            {isEditing && (
                <Box>
                    <Text color="green">Enter the path to clone the repository: </Text>
                    <TextInput
                        value={clonePath}
                        onChange={setClonePath}
                        onSubmit={handleEditSubmit}
                    />
                </Box>
            )}
        </Box>
    );
};

export default GitHub;