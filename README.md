# Application is developed using the next js 14 with App Routing. Code is written in Typescript.
# Here the first page is "Server Side Page", which means api will be called at server not on browser.

## To run the app run below commands
npm install
npm run build
npm run start

## To run the test cases, run
npm run test

## To check the application
1. Open [http://localhost:3000] 
2. Click on any Name of the character in the list to see the details of the character
3. We also have Edit button in details page it will update the details of height and gender of that character after clicking on Save button.
4. We have back to home page button to go back

## Below is the structure of app
1. All the codes are part of src folder
2. Inside the app folder, we have all the pages with their layout
3. All the reusable components are part of components folder like List and ListItem
4. We have create types folder for create the types of api response
5. We have constant file to add all the urls
6. Setup environment variables in .env files
