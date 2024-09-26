/* 
  !!! Form kezelés useRef()-fel !!!

  Submit esetén a formunk rerenderelődik, amit nem szeretnénk
  Megoldások:

  1.) Egy <form>-on belüli <button>-nak fontos megadni a type="button"
  prop-ot, másképp alapértelmezett beállítása miatt (type="submit"),
  azt submit gombnak értelmezi a form és re-renderelődni fog.

  2.) A <form> onSubmit-ja kapja meg a function-t, és használjuk az
  event.preventDefault() fggv-t.

*/

import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const email = useRef();
  const password = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);
    console.log("Sending HTTP request...");
    console.log(enteredEmail, enteredPassword);

    // mentjük ahová szeretnénk

    /* reset */
    //email.current.value = ""; // A react dom miatt nem egy 
                                // elfogadott forma, de így is lehet
    //password.current.value = "";

    //event.target.reset(); // ??
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input ref={email} id="email" type="email" name="email" />
          <div className="control-error">
            {emailIsInvalid &&
              <p>Please enter a valid email address</p>
            }
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input ref={password} id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
