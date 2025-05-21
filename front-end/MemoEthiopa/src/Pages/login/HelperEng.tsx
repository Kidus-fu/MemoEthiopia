import React from 'react';

const HelperEng: React.FC = () => {
    return (
        <div className="p-1  rounded-lg shadow-lg">
    <p className="">
        <span className="font-semibold text-blue-500">Memo Ethiopia</span> offers two ways to log in: via email or username. To ensure your security, an OTP will be sent to your email for verification.
    </p>

    <div className="mt-3">
        <h1 className="text-2xl font-semibold ">Email Login</h1>
        <p className="mt-1  px-2">
            To sign in, please enter your email address. We require this for verification, ensuring that only you can access your account.
        </p>
    </div>

    <div className="mt-3">
        <h1 className="text-2xl font-semibold ">Username Login</h1>
        <p className="mt-1  px-2">
            If you're using a username to sign in, please note that Memo Ethiopia usernames cannot contain spaces. Make sure your username is formatted correctly before submitting.
        </p>
    </div>

    <div className="mt-3">
        <h1 className="text-2xl font-semibold ">Password</h1>
        <p className="mt-1  px-2">
            Enter your password to log in. If you've forgotten your password, don't worry! You can reach out to our support team, and after email verification, you'll receive a reset link within 3 business days.
        </p>
    </div>
</div>
    );
};

export default HelperEng;