import React from 'react'
import firebase from './firebase'

class App extends React.Component {
  //create a handleChange function to handle all the changes
  handleChange = (e) =>{
    const {name, value} = e.target //we get the name and value for target
    this.setState( //the name and value is set inside the state
      {
        [name] : value
      })
  }
  //whatever values we enter in mobile and otp it will create one state and store value inside it
  //We first enable phone number sign-in for our firebase project
  //then we set up the recaptcha. so we create a method as configureCaptcha
  configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptcha verified")
      },
    });
  }
  //we create a method as onSignInSubmit. Sends OTP to the user's phone
  onSignInSubmit = (e) =>{
    e.preventDefault()

    this.configureCaptcha()
    const phoneNumber = "+91" + this.state.mobile //takes the phone number as input
    console.log(phoneNumber)
  
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent")
       // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log("SMS not sent")
    });
  }
  //Now we sign in the user with the Verification code
  //a method is created as onSubmitOTP
  onSubmitOTP = (e) =>{
    e.preventDefault()
      const code = this.state.otp
      console.log(code)
      window.confirmationResult.confirm(code).then((result) => {
         // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user))
        alert("User is verified")
        // ...
        window.location.pathname="/redirect.html"
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert("user not verified")
  });
  }
  //create HTML form and then integrate with OTP. render func takes two arguments html code and html element
  // its purpose is to display the specified html code inside the html element

  render(){
    return (
      <div> 
        <h1>Login Form</h1>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>

        <h1>OTP Form</h1>
        <form onSubmit={this.onSubmitOTP}>
          <input type="number" name="otp" placeholder=" otp number" required onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>

    )
  }
}
export default App
