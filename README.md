This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to use

We can git clone the project using [https://github.com/rahulcodegit/rahul-pandey-front-end-engineer-18July2022](https://github.com/rahulcodegit/rahul-pandey-front-end-engineer-18July2022) link or download the repository. Once downloaded run the following commands:

1. npm install
2. npm start

### `npm install`

It will install the required dependency to run the project.

### `npm start`

npm start runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `Assumptions and flow`

Since I just have started learning NodeJS, I have used LocalStorage for saving and retreiving the saved data. Therefore when we fill data in the form, it will be saved in your Browser LocalStorage.

### `Screens and UI`

UI contains single page with 3 components:

1. Header
2. Basic Info
3. Work Experience

Header:
It contains a title of the Page(My Profile).

Basic Info:
Here we upload the user profile pic(Click on Upload Profile) and save Basic Information(Name and Age)(Click on Edit Information).

Work Experience:
When you click on Add Work Experience Button, user is prompted to enter its current and past work experience details. It contains the following fields:

- Company Logo
- Job Title
- Company Name
- Start Date
- End Date
- Job Description

After entering above details, user will be able to see its work experience details in the page. User can edit or delete the listed work experience using the edit and delete button.
