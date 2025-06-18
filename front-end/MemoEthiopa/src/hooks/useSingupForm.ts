import { FormProps } from "antd"
import { useMessage } from "../components/useMessage"
import { usePostsignupMutation } from "../services/auth/singup"

import { SignupType } from "../Pages/type"
import { usePostloginMutation } from "../services/auth/login"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config"

export const useSignupForm = () => {
    const [postsignup, { isLoading }] = usePostsignupMutation()
    const [postlogin] = usePostloginMutation()
    const SignupisLoading = isLoading
    const showMessage = useMessage()

    const SignupOnFinish: FormProps<SignupType>['onFinish'] = async (values: any) => {
        let password = "";
        let username = "";
        if (values.password !== values.configpassword) {
            showMessage("error", "Password and confirm password do not match")
            return false
        }
        try {
            password = values.password
            username = values.username

            const clear_data = {
                username: values.username,
                email: values.email,
                password: values.password,
                first_name: values.frist_name,
                last_name: values.last_name
            }
            const signupResponse = await postsignup({
                signupuser: clear_data
            })

            if (
                'error' in signupResponse &&
                signupResponse.error &&
                typeof (signupResponse.error as any).status !== "undefined" &&
                (signupResponse.error as any).status === 400
            ) {
                // showMessage("error", "Bad request check your form")
                let errorMessages: any = "Signup failed. Please try again.";
                if (
                    (signupResponse.error as any).data
                ) {
                    errorMessages = (signupResponse.error as any).data;
                }
                if (errorMessages.username) {
                    showMessage("error", errorMessages.username[0]);
                }
                if (errorMessages.email) {
                    showMessage("error", "Email already in use. Please use a different email.");
                }
                if (errorMessages.password) {
                    showMessage("error", errorMessages.password[0]);
                }
                if (errorMessages.first_name) {
                    showMessage("error", errorMessages.first_name[0]);
                }
                if (errorMessages.last_name) {
                    showMessage("error", errorMessages.last_name[0]);
                }
                if (errorMessages.error) {
                    showMessage("error", errorMessages.error);
                }
            } else {
                showMessage("success","Starting login automatically, please wait...")
                 const login_data = {
                username: username,
                password: password
            }

            const singinResponse = await postlogin({
                loginuser: login_data,
                methodLogin: "username"
            })
            if (
                'error' in singinResponse &&
                singinResponse.error &&
                typeof (singinResponse.error as any).status !== "undefined" &&
                (singinResponse.error as any).status !== 200
            ) {
                showMessage("error", "Invalid username or password")
                return false
            }
            const access_token = singinResponse.data.access
            const resfresh_token = singinResponse.data.refresh
            localStorage.setItem(ACCESS_TOKEN, access_token)
            localStorage.setItem(REFRESH_TOKEN, resfresh_token)
            window.location.href = "/otp_verification"
            }

           
            return true

        } catch {

        }
    }
    const SignupOnFinishFailed: FormProps<SignupType>['onFinishFailed'] = (errorInfo) => {
        showMessage("warning", "Please fill all required fields.")
        console.log('Validation Failed:', errorInfo);
    };
    return {
        SignupOnFinish,
        SignupOnFinishFailed,
        SignupisLoading,
    };
}