This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to use

We can git clone the project using [https://github.com/rahulcodegit/profile-info.git](https://github.com/rahulcodegit/profile-info.git) link or download the repository. Once downloaded run the following commands:

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
Initially Name and Age Field will be blank. Click on Edit Information button to enter details and save it. Once saved, we can view the information.

Work Experience:
When you click on Add Work Experience Button, user is prompted to enter its current and past work experience details. It contains the following fields:

- Company Logo
- Job Title
- Company Name
- Start Date
- End Date
- Job Description

After entering above details, user will be able to see its work experience details in the page. User can edit or delete the listed work experience using the edit and delete button.

### `Responsive Page`
Profile page is complete responsive, it will work in all devices (desktops, tablets, and phones)

### `Technology and library`
1. React JS(18.2.0)
2. Ant Design (UI Library)
