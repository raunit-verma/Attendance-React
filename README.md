# Attendance Management System Frontend

This repository contains the frontend component of the **Attendance Management System** project. It is developed using React, a popular JavaScript library for building user interfaces.

## Installation and Setup

To get started with the frontend project, follow these steps:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/raunit-verma/Attendance-React
    ```

2. Navigate to the project directory:
    ```bash
    cd Attendance-React
    ```

3. Install all npm modules by running:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run start
    ```

This will start the development server, and you can view the application in your web browser by navigating to **http://localhost:3000**.

## Building the Project

To build the project for production deployment, run:
```bash
npm run build```

To start in production:
```bash
serve -s build```

#### Dockerfile
The Dockerfile provided in this repository allows you to build a Docker image for the frontend component.

#### Environment Variables
To configure the frontend, you need to set the following environment variables:

**REACT_APP_API_URL**: This variable should be set to the URL of the backend API.
**REACT_APP_DOMAIN**: This variable should be set to the domain of the frontend application.

Make sure to set these environment variables before running the frontend.

#### Docker Image
The Docker image for the frontend component is available on Docker Hub [here](https://hub.docker.com/repository/docker/raunitverma/attendance-front-end/general "here").

#### Backend Repository
If you're looking for the backend repository, it can be found [here](https://github.com/raunit-verma/Attendance-Go "here"). Make sure to check it out for the backend codebase and instructions.

##### License
This project is licensed under the MIT License.