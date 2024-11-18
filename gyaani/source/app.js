import React, { useEffect, useState } from 'react';
import { Text, Box } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import { exec } from 'child_process';
import os from 'os';
import isCI from 'is-ci';
import Spinner from 'ink-spinner';
import apiURL from '../config';
const App = ({ input }) => {
    const [output, setOutput] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showChoices, setShowChoices] = useState(false);
    const [commandResponse, setCommandResponse] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [systemInfo, setSystemInfo] = useState({});
    const [editCommand, setEditCommand] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const systemInfo = {
            username: os.userInfo().username,
            homedir: os.userInfo().homedir,
            osType: os.type(),
            platform: os.platform(),
            uptime: os.uptime(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
        };
        setSystemInfo(systemInfo);
    }, []);

    useEffect(() => {
        if (!process.stdin.isTTY || isCI) {
            console.error('Raw mode is not supported on the current process.stdin.');
            process.exit(1);
        }
        fetchQuestions(input);
    }, [input]);

    const fetchQuestions = async (input) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiURL}/get-questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: `${input}\nSYSTEM INFORMATION: \nUsername: ${systemInfo.username}\nHome dir: ${systemInfo.homedir}\nOS Type: ${systemInfo.osType}\nPlatform: ${systemInfo.platform}\n` }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setQuestions(data.questions);
            setCurrentQuestionIndex(0);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCommand = async (input, answers) => {
        setLoading(true);
        try {
            const formattedAnswers = answers.map((answer, index) => `question ${index + 1}: ${questions[index]}\nanswer ${index + 1}: ${answer}`).join('\n');
            const response = await fetch(`${apiURL}/get-command`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: `${input}\n${formattedAnswers}\nSYSTEM INFORMATION: \nUsername: ${systemInfo.username}\nHome dir: ${systemInfo.homedir}\nOS Type: ${systemInfo.osType}\nPlatform: ${systemInfo.platform}\n` }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setCommandResponse(data.command);
            setShowChoices(true);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSubmit = (answer) => {
        setAnswers([...answers, answer]);
        setCurrentAnswer('');
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            fetchCommand(input, [...answers, answer]);
        }
    };

    const handleChoiceSelect = (item) => {
        if (item.value === 'run') {
            setLoading(false);
            setShowChoices(false);
            exec(commandResponse, (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                process.exit();
            });
        } else if (item.value === 'edit') {
            setLoading(false);
            setShowChoices(false);
            setEditCommand(commandResponse);
            setIsEditing(true);
        } else if (item.value === 'tryAgain') {
            fetchQuestions(input);
        } else if (item.value === 'cancel') {
            process.exit();
        }
        setShowChoices(false);
    };

    const handleEditSubmit = (editedCommand) => {
        exec(editedCommand, (error) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            process.exit();
        });
    };

    const choices = [
        { label: 'Run', value: 'run' },
        { label: 'Edit Before Run', value: 'edit' },
        { label: 'Try Again', value: 'tryAgain' },
        { label: 'Cancel', value: 'cancel' },
    ];

    return (
        <Box flexDirection="column">
            {loading && (
                <Box>
                    <Spinner type="dots" />
                    <Text> Gyaani is Thinking...</Text>
                </Box>
            )}
            {!loading && questions.length > 0 && currentQuestionIndex < questions.length && (
                <Box>
                    <Text>{questions[currentQuestionIndex]}</Text>
                    <TextInput
                        value={currentAnswer}
                        onChange={setCurrentAnswer}
                        onSubmit={handleAnswerSubmit}
                    />
                </Box>
            )}
            {showChoices && (
                <Box flexDirection="column">
                    <Text>Command: {commandResponse}</Text>
                    <Box marginTop={1}>
                        <SelectInput items={choices} onSelect={handleChoiceSelect} />
                    </Box>
                </Box>
            )}
            {isEditing && (
                <Box>
                    <Text>Edit Command: </Text>
                    <TextInput
                        value={editCommand}
                        onChange={setEditCommand}
                        onSubmit={handleEditSubmit}
                    />
                </Box>
            )}
            {output.map((item, index) => (
                <Box key={index} flexDirection="column">
                    <Text>
                        <Text>Command:</Text> {item.command}
                    </Text>
                    <Text>
                        <Text>Response:</Text> {item.response}
                    </Text>
                    <Text>-------------------------</Text>
                </Box>
            ))}
        </Box>
    );
};

export default App;