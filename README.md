# Cloud Full-stack Deployment (Railway)

Cloud full-stack (Lorem Ipsum generator app) deployment to Railway.  

## Description

A Node.js application that generates placeholder text (Lorem Ipsum) via an API and serves a simple frontend.  
This project is configured with CI/CD using GitHub Actions to automatically build, test, and deploy to Railway on every push to the main branch. Monitoring is provided through Railway Service Metrics, giving real‑time visibility into CPU, memory, and network usage. Made for Digital Skola Cloud Engineer Bootcamp's final project.

### Features

* Generates random Lorem Ipsum text for prototyping and design.
* Lightweight front-end built with HTML, CSS, and JavaScript.
* Node.js backend serving static files and API endpoints.
* Automated CI/CD pipeline using GitHub Actions.
* Continuous deployment to Railway Cloud.

### Project Structure

ds-cloudengineer-clouddeployment/
│── public/
│   ├── index.html
│   │  
│   └── style.css
│ 
│── test/
│   │ 
│   └── app.test.js 
│ 
│── .github/workflows/   
│   │ 
│   └── deploy.yml    
│── index.js       
│── server.js            
│── package.json         
│── README.md        

## Getting Started

### Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js (Express.js for serving content)
* Version Control: Git + GitHub
* CI/CD: GitHub Actions
* Cloud Hosting: Railway

### Dependencies
* Express.js: lightweight web server for Node.js
* Jest (optional): testing framework

Install dependencies:
```bash
npm install express
npm install --save-dev jest 
```
Create server.js:
```js
const app = require("./index");

const PORT = process.env.PORT || 3000;

let server;

server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
```

Create package.json:
```json
{
  "name": "lorem-ipsum-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "lorem-ipsum": "^2.0.4"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```
### Local development
```bash
# Clone repository
git clone https://github.com/samwbrata16/ds-cloudengineer-clouddeployment.git
cd ds-cloudengineer-clouddeployment

# Install dependencies
npm install

# Run locally
npm start
```
Visit http://localhost:3000 in your browser.

### CI/CD Workflow
* Pushes to GitHub to trigger GitHub Actions workflow.
* Build Stage for installing Node.js dependencies.
* Test Stage for running automated tests.
* Deploy Stage for deploying to Railway Cloud automatically.

Create GitHub Actions workflow:
```yaml
name: Build, Test & Deploy to Railway

on:
  push:
    branches:
      - main

jobs:
  build-test-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Install Railway CLI (@railway/cli)
        run: npm install -g @railway/cli

      - name: Deploy to Railway
        if: success()
        run: railway up --service ${{ secrets.RAILWAY_SERVICE_NAME }}
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
          RAILWAY_PROJECT_ID: ${{ secrets.RAILWAY_PROJECT_ID }}
```

### Deployment
* Create a Railway account and add a new project.
* Connect GitHub repo to Railway project.
* Generate Railway Token and add to Github Secrets.
* Configure GitHub Actions workflow (.github/workflows/deploy.yml).
* Push changes, pipeline will run and app will be deployed automatically.

## Live Demo
Once deployed, your app will be available at:
https://your-project-name.up.railway.app
(For this project: https://cloud-deployment.up.railway.app/)

## Monitoring with Railway Metrics and Logs
Use the Service Metrics tab in Railway to monitor:

* CPU usage (per replica or summed across replicas)
* Memory usage
* Public network traffic
* Requests

Switch between Replica view (per container) and Sum view (aggregate). The /health endpoint ensures Railway can track service availability.

Use the Logs tab in Railway to monitor logs.
