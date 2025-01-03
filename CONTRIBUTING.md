# Contributing to GyaaniCLI

Thank you for your interest in contributing to **GyaaniCLI**! 🎉 Your efforts, whether big or small, help make this project better. By contributing, you agree to follow our guidelines, ensuring a welcoming and collaborative environment for everyone.

---

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Reporting Issues](#reporting-issues)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Helpful Links](#helpful-links)

---

## How to Contribute

We welcome all types of contributions, including:

- 🐛 Bug fixes  
- ✨ New features  
- 📚 Documentation updates  
- 🔄 Code refactoring  
- ✅ Testing and validation  

### Steps to Get Started

1. **Fork the Repository**  
   Click the "Fork" button on the [GyaaniCLI repository](https://github.com/subh05sus/GyaaniCLI) to create your own copy.

2. **Clone Your Fork**  
   Clone the forked repository to your local machine:  
   ```bash
   git clone https://github.com/<your-username>/GyaaniCLI.git
   ```

3. **Create a Branch**  
   Create a branch for your changes:  
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**  
   Implement your changes and commit them with meaningful commit messages.

5. **Push Your Changes**  
   Push your branch to GitHub:  
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**  
   Go to the original repository and create a pull request (PR). Provide a clear description of your changes.

---

## Reporting Issues

If you encounter a problem or have an idea for improvement, let us know!

1. **Search Existing Issues**  
   Check if the issue has already been reported in the [Issues section](https://github.com/subh05sus/GyaaniCLI/issues).

2. **Create a New Issue**  
   If it hasn’t been reported, click "New Issue" and include:
   - **Description:** Clearly describe the issue or feature request.
   - **Reproduction Steps:** Steps to reproduce the issue (if applicable).
   - **Expected vs. Actual Behavior:** What you expected vs. what happened.
   - **Logs/Error Messages:** Attach relevant logs or screenshots.

---

## Submitting a Pull Request

When submitting a PR, ensure the following:

- **Descriptive Title and Comments:** Clearly explain what the PR does and why.  
- **Follow Code Style:** Match the existing coding conventions.  
- **Test Thoroughly:** Verify that your changes work as intended and don’t introduce new issues.  
- **Avoid Breaking Changes:** If unavoidable, document the breaking changes and provide context.

---

## Code of Conduct

We expect everyone to follow our [Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct.html). Be respectful, inclusive, and kind in all interactions.

---

## Development Setup

### Prerequisites
- **Node.js** and **npm** installed  
- **Python** installed (for the AI server)

### Setting Up the AI Server
1. Navigate to the AI server directory:  
   ```bash
   cd ai-server
   ```

2. Create a `.env` file and add your OpenAI API key:  
   ```env
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. Set up a Python virtual environment and install dependencies:  
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Start the AI server:  
   ```bash
   python app.py
   ```

   The server will run at [http://127.0.0.1:5000](http://127.0.0.1:5000).

### Setting Up the React CLI App
1. Navigate to the `gyaani` directory:  
   ```bash
   cd gyaani
   ```

2. Update `config.js` with the local AI server URL:  
   ```javascript
   export const apiURL = 'http://127.0.0.1:5000';
   ```

3. Install dependencies:  
   ```bash
   npm install
   ```

4. Test the CLI with:  
   ```bash
   gyaani <command>
   ```

   Replace `<command>` with commands.

---

## Helpful Links

- **GitHub Repository:** [GyaaniCLI](https://github.com/subh05sus/GyaaniCLI)  
- **Issues:** [Report Issues](https://github.com/subh05sus/GyaaniCLI/issues)  
- **Discussions:** [Join Discussions](https://github.com/subh05sus/GyaaniCLI/discussions)  

---

Thank you for contributing to **GyaaniCLI**! 🚀 Together, we’re building something amazing. 💡  
