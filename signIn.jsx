// import React,{useState} from 'react'
// import {signIn} from './Authentication';

// function SignIn() {
//     const [email,setEmail]=useState('');
//     const [password,setPassword]=useState('');
   
//      const handlesignIn=async ()=>{

//         try{
//         await signIn(email,password);
//         setEmail('');
//         setPassword('');
//         }
//         catch(error){
//             alert(error.message);
//         }
//     }
//   return (
//     <>
//     <input
//     type="email"
//     placeholder='Email'
//     value={email}
//     onChange={(e)=>(setEmail(e.target.value))}
//     >
//     </input>
//     <input
//     type="password"
//     placeholder='Password'
//     value={password}
//     onChange={(e)=>(setPassword(e.target.value))}
//     >
//     </input>
//     <button
//     className="bg-red-500 p-2"
//     onClick={handlesignIn}
//     >Sign In</button>
//     </>
//   )
// }

// export default SignIn;

// SignIn.jsx
import React, { useState } from 'react';
import { signIn } from './Authentication';  // import the signIn function

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const userCredential = await signIn(email, password);
      const user = userCredential.user;
      
      // After successful sign-in, you can access the user’s UID
      console.log("Signed in user with UID: ", user.uid);
      setEmail('');
      setPassword('');
      
      // Optionally, you can now fetch user data from Firebase
      // Here, we’re fetching the cart data from Firebase based on the `uid`
      const db = getDatabase();
      const cartRef = ref(db, 'carts/' + user.uid); // Use the user UID to get the cart
      onValue(cartRef, (snapshot) => {
        const cartData = snapshot.val();
        if (cartData) {
          // Set the cart state if data exists
          setCart(cartData);
        }
      });

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
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-red-500 p-2" onClick={handleSignIn}>
        Sign In
      </button>
      {error && <p>{error}</p>}
    </>
  );
}

export default SignIn;
