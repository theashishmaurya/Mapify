import { useEffect, useState } from 'react';
import firebase from '../../firebase/clientApp';
import { GithubAuthProvider } from 'firebase/auth';

const SignUp = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { firstName, lastName, email, password, confirmPassword } = data;

  const GithubSingUp = (e) => {
    e.preventDefault();
    console.log('working');
    const provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  const GoogleSignUp = (e) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  const EmailLinkSingUp = () => {
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://loaclhost:3000/home',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.localhost.ios',
      },
      android: {
        packageName: 'com.localhost.android',
        installApp: true,
        minimumVersion: '12',
      },
      dynamicLinkDomain: 'example.page.link',
    };
  };

  const handleOnChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();

    setData({ ...data, firstName: '', lastName: '', email: '', feedback: '' });
  };

  return (
    <div className="my-1 w-full h-full ">
      <form className="">
        <div className="flex flex-col">
          <div className="grid md:grid-cols-2 grid-col-1 gap-2">
            <input
              className="p-2 m-2 pl-2 placeholder-gray-500 border-b-2 min-w-full min-h-full  tracking-wide focus:outline-none placeholder-opacity-75 text-sm "
              placeholder="first Name*"
              value={firstName}
              onChange={handleOnChange('firstName')}
            />
            <input
              className="p-2 m-2 pl-2 placeholder-gray-500 border-b-2 min-w-full min-h-full border-1 tracking-wide  focus:outline-none placeholder-opacity-75 text-sm "
              placeholder="Last Name"
              value={lastName}
              onChange={handleOnChange('lastName')}
            />
          </div>
          <input
            className="m-2 p-2 mt-6 pl-2 placeholder-gray-500 border-b-2 min-w-full min-h-full  tracking-wide  focus:outline-none placeholder-opacity-75 text-sm"
            placeholder="jonh@email.com*"
            value={email}
            onChange={handleOnChange('email')}
          />
          <input
            className="p-2  m-2  mt-4 pl-2 placeholder-gray-500  min-w-full min-h-full border-b-2 tracking-wide  focus:outline-none placeholder-opacity-75 text-sm "
            placeholder="Password"
            value={password}
            onChange={handleOnChange('password')}
          />
          <input
            className="p-2  m-2  mt-4 pl-2 placeholder-gray-500  min-w-full min-h-full border-b-2 tracking-wide  focus:outline-none placeholder-opacity-75 text-sm "
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleOnChange('confirmPassword')}
          />

          <div className="mt-4 xl:mt-10">
            <button className="w-full m-2 p-2 bg-black text-white border-2 shadow-md rounded-xl text-sm xl:text-md">
              Sign Up{' '}
            </button>
            <div className="flex-col flex xl:flex-row ">
              <button
                className="w-full m-2 p-2 flex justify-center items-center bg-black text-white border-2 border-black shadow-md rounded-xl text-sm xl:text-md"
                onClick={GithubSingUp}
              >
                <div
                  className="iconify"
                  data-icon="octicon:mark-github-16"
                ></div>
                <div className="mx-2">Sign Up with Github</div>
              </button>
              <button
                className="w-full m-2 flex justify-center items-center p-2 bg-white border-2 shadow-md rounded-xl text-sm xl:text-md"
                onClick={GoogleSignUp}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    />
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    />
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    />
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    />
                  </svg>
                </span>
                <div className="mx-2">Sign Up with Google</div>
              </button>
            </div>
          </div>
        </div>
        <div className="justify-end items-end mt-4 ml-4 xl:my-10 text-xs">
          By clicking the button above, you agree to our{' '}
          <span className="text-blue-500">terms of use</span> and
          <span className="text-blue-500"> privacy policies.</span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
