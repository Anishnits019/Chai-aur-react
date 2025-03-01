// import React ,{useState} from 'react'
// import {signUp} from './Authentication';
// function SignUp() {
//     const [email,setemailId]=useState('');
//     const [password,setPassword]=useState('');
//     // const [error,setError]=useState('');

//     const handleSignUp = async ()=>{
//           try{
//           await signUp(email,password);
//           <p>Account Has been Created</p>
//            setemailId('');
//            setPassword('');

//           }
//           catch(error){
//              setError(error.message);
//           }
//     }
//   return (
//     <>
//     <input
//     type="email"
//     placeholder='Email'
//     value={email}
//     onChange={(e)=>(setemailId(e.target.value))}
//     required
//     >
//     </input>
//     <input
//     type="password"
//     placeholder='Password'
//     value={password}
//     onChange={(e)=>(setPassword(e.target.value))}
//     required
//     minLength={6} 
//     >
//     </input>
//     <button
//     className='bg-blue-500 p-2'
//     onClick={handleSignUp}>
//     Create Account
//     </button>
//     </>
//   )
// }

// export default SignUp
// SignUp.jsx
import React, { useState } from 'react';
import { signUp } from './Authentication';  // import the signUp function

function SignUp() {
  const [email, setemailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      // Create the user
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      // After successful sign-up, the user is authenticated
      console.log("User created with UID: ", user.uid);
      setemailId('');
      setPassword('');
      // You can store some initial data in the database, for example:
      const db = getDatabase();
      set(ref(db, 'users/' + user.uid), {
        email: email,
        cart: []  // initialize with empty cart data
      });

      alert('Account Created Successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setemailId(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button className="bg-blue-500 p-2" onClick={handleSignUp}>
        Create Account
      </button>
      {error && <p>{error}</p>}
    </>
  );
}

export default SignUp;
