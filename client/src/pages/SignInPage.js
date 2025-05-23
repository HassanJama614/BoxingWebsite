import React from 'react';
import SignIn from '../components/Auth/SignIn';
const SignInPage = () => {
    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h2>Sign In</h2>
            <SignIn />
        </div>
    );
};
export default SignInPage;