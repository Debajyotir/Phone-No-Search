# Project Setup and Running Instructions

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system. You can download and install it from [Node.js official website](https://nodejs.org/).

## Setup Instructions

1. **Install Dependencies**
   - Open your terminal or command prompt.
   - Navigate to the project directory.
   - Run the following command to install the necessary dependencies:
     ```bash
     npm install
     ```

2. **Run the Project in Development Mode**
   - Use the following command to start the project:
     ```bash
     npm run dev
     ```

3. **Build the Project for Production**
   - To build the project, run:
     ```bash
     npm run build
     ```

4. **Start the Project**
   - After building, start the project with:
     ```bash
     npm start
     ```

5. **Access the Application**
   - The application will be running on port 5000. You can access it via:
     ```
     http://localhost:5000
     ```

## API Endpoints

### Create User
- **Method**: POST
- **URL**: `http://localhost:5000/api/v1/auth/create-user`
- **Body**: raw (JSON)
  ```json
  {
      "name": "Dipam Roy",
      "phoneNo": "7001350878",
      "password": "1234",
      "email": "dipam@gmail.com" // Optional
  }


### Login
- **Method**: POST
- **URL**: `http://localhost:5000/api/v1/auth/login`
- **Body**: raw (JSON)
  ```json
  {
     "phoneNo": "1328665962",
     "password": "1234"
  }


### Logout
- **Method**: GET
- **URL**: `http://localhost:5000/api/v1/auth/logout`


### Add Contact
- **Method**: POST
- **URL**: `http://localhost:5000/api/v1/contacts/upload`
- **Body**: raw (JSON)
  ```json
  {
      "phoneNo" : "7001350878",
       "name": "Dipu Da"
  }

### Report Spam
- **Method**: POST
- **URL**: `http://localhost:5000/api/v1/spam/report`
- **Body**: raw (JSON)
  ```json
  {
      "phoneNo" : "7001050878"
  }

### Search By Name
- **Method**: GET
- **URL**: `http://localhost:5000/api/v1/search/by-name`
- **Body**: raw (JSON)
  ```json
  {
      "name": "Di"
  }

### Search by Number
- **Method**: GET
- **URL**: `http://localhost:5000/api/v1/search/by-number`
- **Body**: raw (JSON)
  ```json
  {
      "phoneNo": "7001350878"
  }
