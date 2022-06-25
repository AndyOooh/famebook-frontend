# social-media-app
A MERN stack BE and FE in one repo

![project-image1](https://user-images.githubusercontent.com/60953822/172692414-d6214bba-74bb-40d9-a5e8-81ab8719fa4a.jpg)

![project-image2](https://user-images.githubusercontent.com/60953822/172692409-71ac59df-071a-41a0-b6dd-7d4dfba733bf.jpg)

![project-image3](https://user-images.githubusercontent.com/60953822/172690728-af434ae9-f231-4c23-b300-e4659d859324.jpg)





Next steps:
    - store photos from user upload.
      - use multer?
      - what to store on mongodb and where to store the actual files?
    - Change header to show clickable profile photo on the right:
      - should redirect to main profile page but also have drop down menu with: edit profile, notofications, etc.
    - store events in new collection with userId as reference.
      - have an events menu item on main profile page.
    - signup email and reset pw email
    - responsive.
    - testing git push command <-- can delete this line>

Using: 
    - css vaiables with var(--varname). For color-palette and --header-height: 4rem; <-- sets header/footer height and main is: min-height: calc(100vh - (2 * var(--header-height)));
    - react-router-dom v6
    - useRef(): Useful for user inputs especially and if we are just reading some value. This example below could go either way because we are doing a no-no. With useState() we update state with every keystroke. We also have a inputChangeHandler() and we feed the state back in to the <input> value property. With useRef() we don't update state and we can get rid of the inputChangeHandler()s and the value + onChange properties on the input element. With my custom Input component (instead of buil-in <input>) I have to use React.ForwardRef() [React chap 10], otherwise I get an error. useRef() example:
        AddUser.js 
        const AddUser = (props) => {
            const nameInputRef = useRef();
            const ageInputRef = useRef();

            const addUserHandler = (event) => {
                event.preventDefault();
                const enteredName = nameInputRef.current.value;
                const enteredUserAge = ageInputRef.current.value;
                
                props.onAddUser(enteredName, enteredUserAge);
                nameInputRef.current.value = '';
                ageInputRef.current.value = ''; //manipulating the DOM without React. Usually a no-no but in this case it's alright.
            };
        };
        - context API for authentication. 
    - cors NPM package. Replaced Max' solution with the npm package. Had some trouble. At one point I thought I had to setup async as shown on npm page but the problem was a trailiing / on the origin I set in config: http://localhost:3000/ should be http://localhost:3000. Also, in docs they say to do app.options('*', cors(corsConfig)) to allow preflight OPTIONS requests and add it befoe other routes. Preflights still pass efter deleting though.

Notes:
    Spreading an array in template literal:
        const cardClasses = props.extraClasses
        ? `${classes.card} ${props.extraClasses.join(' ')}`
        : `${classes.card}`;
        I used [...props.extraClasses] but it doesn't work with multiple classes. New solution:
        props.extraClasses.join(' ') to join the strings of the array with a whitespace as delimiter (instead of the default comma)

    Error handling:
        status(400) is express' chainable version of the error object's statusCode. Following two examples accomplishes the same:
        
            res.statusCode = 500;
            return res.json({
                status: "error"
            })

            return res.status(500).json({
                status: "error"
            });
        - async code and error (middleware) handling:
        Had big issues with this as Max' code seems to be bugged. In async code throw error will NOT be sent to the express error middleware in app.js - it will crash the app. We have toi use (return) next(error). In addition, if we declare the function in which the error is thrown as async, it applies to EVERYTHING inside that function and not only inside sections with await or then(). However, we may be able to avoid this by using then() instead of async/await. See signup method in authController.
        - with the fect API errors are not thrown automatically when we get unsuccessful status codes in response. If we use Axios they are. SO in fecth we need to use if (!reponse.ok or response.status !== 201 ) or simialr checks and throw errors inside those blocks to be handled in catch.
    Button border-color: 
        Showing two colors because browser defaults to border-style: inset (makes it look like it has been inset into the page). Solution: border-style: solid.
    Span element can have OnClick. Have to manually set cursor: pointer if needed.
    FormData cant be clg and formData.entries() cant either (its an iterator), Have to:  for (var pair of formData.entries()) {
      console.log('from iterator:', pair[0] + ', ' + pair[1]);
    }
    CSS cant do inline comments. A probelm if I want to comm out a block which already has comments. SASS can do this.abscan sometimes clean code by using inline event handlers. eg: 
    <Modal styles={[classes.modal, classes.card]} hideModal={() => props.hideModal()}>
    instead of:
    const hideModalHandler = () => {
    props.hideModal();
  };
  and:
  <Modal styles={[classes.modal, classes.card]} hideModal={hideModalHandler}>
    - Destructuring hyphens: Use alias. (https://stackoverflow.com/questions/51357215/destructuring-object-having-hyphen-in-property-name):
        - let human= {
            "first-name":"John",
            "last-name":"Doe",
            age:150
        }

        let {age}= human;
        let {'first-name': first_name} = human;

        console.log(first_name)


    Minor mistakes I encounterd:
        - typos in 'access-allow-origin..'
        - forgetting to format body obj in http req to json (fetch()): body: JSON.stringify({key: val})
        - Environment variables: Have to restart the project for process.env.variable to not be undefined. 
        - Decided to store an obj in LocalStorage rather than three variables. Was challenging:
            - destrcucturing of undefined. if undefined initially but has values later, we can use || {} or some other fallback value. https://stackoverflow.com/questions/48433008/js-es6-destructuring-of-undefined
            - localstorage: have to JSON.stringify() to add obj to LS, and opposite we have to JSON.parse()
        - Pending Promise: ALWAYS check if async! Maybe an await is missing??
        - Trouble with global vs lovcal styles again. This time I needed local to overwrite index.css. Changing the order of classes in className={} did not work. Had to move index.css above app.js imopprt in index.js. This means that local styles woll always overwrite index.css styles (I think).
        - Create a less than full length border in CSS: use :after:
            - .profile-details:after {
                    content: "";
                    background: rgba(0, 0, 0, 0.25);
                    position: absolute;
                    bottom: 0;
                    left: 5%;
                    height: 0.05rem;
                    width: 90%;
                    /* border-bottom: 1px solid red; */
                }

    Env variables:
        - node: nodemon.json file. env obj with json syntax, returns process.env.variable
        - react: .env file. REACT_APP_VARNAME, return in html: %VARNAME%, in .js files: process.env.VARNAME
        - restart servers for IDE completion.


<!-- ------------------from CREATE_REACT-APP ------------------------------->

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
