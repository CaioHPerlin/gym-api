# Express + Typescript REST API Boilerplate

This repository provides a basic structure for building REST APIs using Express and TypeScript. It includes essential configurations and dependencies required to help you get started quickly and securely.

## Features

- Express server setup with TypeScript
- Basic middleware configuration (CORS, JSON parsing, Global Error Handler)
- Support for Custom Errors
- Pre-configured ESLint and Prettier for code quality and formatting
- Environment variable management with `dotenv`
- Basic folder structure for organizing and versioning your API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/express-ts-boilerplate.git
   cd express-ts-boilerplate
   ```

2. Install dependencies:

    ```bash
   npm install
    # or
    yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```bash
   PORT=5000
   NODE_ENV=development
   DEBUG=false
   ```

### Running the Server

```bash
npm run dev
# or 
yarn dev
```

The server will be running on `http://localhost:5000`.

### Building the Project

To build the project, run:

```bash 
npm run build
# or
yarn build
```
The compiled files will be located in the **dist** directory.

### Linting
To lint your code and automatically fix issues, run:

```bash
npm run lint
# or 
yarn lint
```

## Project Structure

```
express-ts-boilerplate/
├── dist/                   # Compiled files
├── node_modules/           # Node.js modules
├── src/                    # Source files
│   ├── api/                # API related files
│   │   ├── v1/             # Version 1 of the API
│   │   │   ├── controllers/
│   │   │   ├── interfaces/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   ├── routes/
│   │   │   └── services/
│   ├── config/             # Configuration files
│   │   └── db.ts           # Database configuration
│   ├── errors/             # Custom error classes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── app.ts              # Main application file
├── .gitignore              # Git ignore file
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore file
├── eslint.config.mjs       # ESLint configuration
├── package.json            # NPM package configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Contributing
Feel free to fork this repository and make your own changes. Pull requests are welcome!

## License

This project is licensed under the **ISC License.**

<br>

> Thank you for reading and happy *express*-ing! 👾
