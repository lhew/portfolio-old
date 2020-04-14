# fq-approval

  

Front-end project for the debtor approval workflow.

  
### Project startup
after install all dependencies thorugh `npm install `, Start the project by typing `npm start`. In develop mode, it must show an app starting from `localhost:3002`.
  
### Toolkit path
If nothing is pointed, the Approval App will use the starndard Toolkit path (localhost:8081). to point it yourself, start the app using `npm start -- --toolkit_path=http://youraddress.com:port`.

### Testing
You can run tests by typing `npm run test`. If you want to run tests as you go you can run `npm run test:watch`

### Linting
To check the code linting, type `npm run lint` 

### Storybook
You can run storybook for the project by typing `npm run storybook`. A new storybook window will appear at `localhost:6009`
You need to run the project to generate the given CSS assets and then, run the Storybook app.

to get CSS and/or another resources, create a file at `.storybook/preview-head.html` with the following content:

```
<link href="http://localhost:8081/css/style.css" rel="stylesheet"/> <!-- toolkit development address and/or the address you would like to -->
<link href="http://localhost:3002/css/index.css" rel="stylesheet">  <!-- Approval app assets address -->
```

### Deploy, CI/CD
You can check the code merged on `development` branch at `approval.finqle.dev`.

### Relevant dependencies
 - fq-toolkit
 - fq-components
 - @apollo/react-hooks
 - formik
 - axios

