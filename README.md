# 🤝 LinkedIn Agent

An AI-powered LinkedIn automation agent built with **TypeScript** that generates personalized connection requests and posts to help you grow your professional network effortlessly.

---

## ✨ Features

- 🧠 **AI-generated connection requests** — Crafts personalized, context-aware connection messages based on a target profile
- 📝 **Post generation** — Creates engaging LinkedIn posts tailored to your tone, industry, and goals
- ⚡ **TypeScript-first** — Fully typed codebase for a safe and scalable developer experience

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- An API key for your chosen AI provider (e.g., OpenAI, Gemini)

### Installation

```bash
git clone https://github.com/your-username/linkedin-agent.git
cd linkedin-agent
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
# AI provider key
OPENAI_API_KEY=your_api_key_here

# (Optional) LinkedIn credentials if using browser automation
LINKEDIN_EMAIL=your_email@example.com
LINKEDIN_PASSWORD=your_password
```

> [!CAUTION]
> Never commit your `.env` file. It is already listed in `.gitignore`.

### Running the Agent

```bash
# Development
npm run dev

# Build & run production
npm run build
npm start
```

---

## 📁 Project Structure

```
linkedin-agent/
├── src/
│   ├── agent/          # Core AI agent logic
│   ├── prompts/        # Prompt templates for connection requests & posts
│   ├── linkedin/       # LinkedIn interaction layer (API / browser)
│   └── index.ts        # Entry point
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🛠️ Usage

### Generate a Connection Request

```typescript
import { generateConnectionRequest } from './src/agent';

const message = await generateConnectionRequest({
  name: 'Jane Doe',
  title: 'Senior Software Engineer at Acme Corp',
  sharedInterests: ['TypeScript', 'AI', 'open source'],
});

console.log(message);
```

### Generate a LinkedIn Post

```typescript
import { generatePost } from './src/agent';

const post = await generatePost({
  topic: 'The future of AI agents in the workplace',
  tone: 'professional',
  length: 'medium',
});

console.log(post);
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> [!NOTE]
> Always use this tool responsibly and in compliance with [LinkedIn's Terms of Service](https://www.linkedin.com/legal/user-agreement).

