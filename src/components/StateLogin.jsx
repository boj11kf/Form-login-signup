/* 
  !!! Form kezelés useState()-ttel !!!
    - Előny lehet, hogy ebben az esetben már a typing alatt is
    képesek vagyunk infót adni a begépelt adatról, hogy valid-e
    nem csak a végén. Nem úgy, mint a referencia alapúnál. Fancy

  Submit esetén a formunk rerenderelődik, amit nem szeretnénk
  Megoldások:

  1.) Egy <form>-on belüli <button>-nak fontos megadni a type="button"
  prop-ot, másképp alapértelmezett beállítása miatt (type="submit"),
  azt submit gombnak értelmezi a form és re-renderelődni fog.

  2.) A <form> onSubmit-ja kapja meg a function-t, és használjuk az
  event.preventDefault() fggv-t.

*/

import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function StateLogin() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (emailHasError || passwordHasError) {
      return;
    }
    // mentjük ahová szeretnénk
    console.log(emailValue, passwordValue);

    /* reset */
    /* setEnteredValues({
      email: "",
      password: "",
    }); */
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <Input
          label={"email"}
          id={"email"}
          type={"email"}
          name={"email"}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a vaild email address"}
        />
        <Input
          label="password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && "Please enter a vaild password"}
        />
      </div>
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
