# PasteBin

A Pastebin alternative for sharing text and code snippets via unique, shareable links. Built with React, Express.js, and MongoDB, this application provides features such as syntax highlighting, auto-expire links, deleting a snipper after reading, etc.

# Features
- **Paste Creation**  
  Easily create new pastes by entering text or code snippets.

- **Shareable Links**  
  Generate unique URLs for each paste to share content seamlessly.

- **Syntax Highlighting**  
  Automatically highlights syntax for various programming languages.

- **Expiration Options**  
  Set expiration times for temporary pastes that auto-delete after a specified period.

- **Responsive Design**  
  Fully optimized for a seamless experience across devices and screen sizes.

# Tech Stack
## Frontend
- **React**: A JavaScript library for building user interfaces, facilitating the creation of interactive and dynamic web applications.
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects, serving as an alternative to traditional bundlers like Webpack.
- **Bootstrap**: A CSS framework for designing responsive and mobile-first web applications, used to style and layout the user interface.
- **React Router**: A library for managing navigation and routing in React applications, enabling smooth transitions between pages.

## Backend
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, enabling server-side scripting and the development of scalable network applications.
- **MongoDB**: A NoSQL database used to store paste data, providing flexibility and scalability for handling large amounts of unstructured data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution to model the application data.
- **JWT (JSON Web Tokens)**: A compact and secure way to transmit information between parties as a JSON object, used for implementing authentication and authorization.

## Tools
- **Postman**: API testing tool for debugging and ensuring seamless communication between the frontend and backend.
- **Git**: A distributed version control system for tracking changes in source code during software development.
- **GitHub**: A platform for hosting and collaborating on Git repositories, facilitating version control and project management.

# Prerequisites

Before you begin, ensure you have the following installed:

### 1. **Node.js (v16 or later)**
   - Download and install Node.js from the official website: [https://nodejs.org/](https://nodejs.org/)
   - Node.js is required to run the backend server and manage project dependencies.

### 2. **npm (Node Package Manager)**
   - npm comes bundled with Node.js and is used to manage the project's dependencies. Verify the installation by running:
     ```bash
     npm --version
     ```

### 3. **MongoDB**
   - You will need a MongoDB instance to store data.
   - You can set up a **local MongoDB server** by following the instructions here: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
   - Alternatively, use **MongoDB Atlas** for a cloud-based solution: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

### 4. **Git**
   - Git is required for version control and to clone the project repository.
   - Install Git from [https://git-scm.com/](https://git-scm.com/) if you haven't already.

### 5. **Postman (for testing APIs) (Optional)**
   - Postman is useful for testing API endpoints and making sure the backend is working as expected: [https://www.postman.com/](https://www.postman.com/)

# Installation

Follow these steps to get your project up and running locally.

### 1. Clone the repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/aryan-chopra/PasteBin.git
```

### 2. Navigate to the project directory
Change to the project directory:

```bash
cd PasteBin
```

### 3. Install Backend Dependencies
Navigate to the backend folder and install the required dependencies:

```bash
cd backend
npm install
```

### 4. Install Frontend Dependencies
Navigate to the frontend folder and install the required dependencies:

```bash
cd ../frontend
npm install
```

### 5. Set up Environment Variables
Create a .env file in the backend directory and configure your environment variables, such as your MongoDB connection string:

```plaintext
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
PORT=5000
```
If you're using MongoDB Atlas, replace <Your MongoDB connection string> with your connection string provided by Atlas.

### 6. Run the Development Server
After installing the dependencies and setting up the environment variables, you can run the development servers for both the backend and frontend.

- **Start the backend server:**
```bash
cd backend
npm run dev
```
- **Start the frontend server:**
```bash
cd ../frontend
npm run dev
```

# Directory Structure
```plaintext
PasteBin/
├── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── utils/
├── frontend/
    ├── assets/
    ├── src/
        ├── components/
        ├── pages/
```
