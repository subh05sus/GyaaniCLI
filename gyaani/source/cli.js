#!/usr/bin/env node
import meow from 'meow';
import { render } from 'ink';
import React from 'react';
import fetch from 'node-fetch';
import ora from 'ora';
import App from './app.js';
import Hero from './hero.js';
import SysInfo from './sysinfo.js';
import GitHub from './github.js';
import GenerateImage from './generate-image.js';

const cli = meow(`
    Usage
        $ gyaani [input]

    Options
        --help     Show help
        --version  Show version number
        --explain  Explain a concept
        --sysinfo  Show system information
        --github   Show GitHub repository details
        --generate Generate an image from a prompt
`, {
    importMeta: import.meta,
    flags: {
        explain: {
            type: 'boolean',
            default: false
        },
        sysinfo: {
            type: 'boolean',
            default: false
        },
        github: {
            type: 'string',
            default: ''
        },
        generate: {
            type: 'string',
            default: ''
        }
    }
});

if (cli.flags.sysinfo) {
    render(<SysInfo />);
} else if (cli.flags.github) {
    render(<GitHub repoUrl={cli.flags.github} />);
} else if (cli.flags.explain) {
    const input = cli.input.join(" ");
    const spinner = ora('Gyaani is thinking...').start();

    fetch(`${apiURL}/explain`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
    })
    .then(response => response.json())
    .then(data => {
        spinner.stop();
        console.log(`Explanation: ${data.explaination}`);
    })
    .catch(error => {
        spinner.stop();
        console.error('Error:', error);
    });
} else if (cli.flags.generate) {
    render(<GenerateImage prompt={cli.flags.generate + cli.input.join(" ")} />);
} else if (cli.input.length === 0) {
    render(<Hero />);
} else {
    render(<App input={cli.input.join(" ")} />);
}