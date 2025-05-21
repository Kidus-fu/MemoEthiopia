import { FormProps } from "antd"
import { useMessage } from "../components/useMessage"
import { usePostsingupMutation } from "../services/auth/singup"

import { SingupType } from "../Pages/type"
import { usePostloginMutation } from "../services/auth/login"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config"

export const useSingupFrom = () => {
    const [postsingup, { isLoading }] = usePostsingupMutation()
    const [postlogin ] = usePostloginMutation()
    const SingupisLoading = isLoading
    const showMessage = useMessage()

    const SinguponFinish: FormProps<SingupType>['onFinish'] = async (values: any) => {
        try {
            const password = values.password 
            const clear_data = {
                username: values.username,
                email: values.email,
                password: values.password,
                first_name: values.frist_name,
                last_name: values.last_name
            }
            const singupResponse = await postsingup({
                singupuser: clear_data
            })
            
            if ('error' in singupResponse && singupResponse.error?.status === 400) {
                showMessage("error","Bad request check your form")
            }

            console.log(singupResponse)
            if (singupResponse?.data) {
                localStorage.setItem("userinfo", JSON.stringify(singupResponse.data));
            }
            const username = singupResponse.data.username 
            const login_data = {
                username: username,
                password:password
            }
            console.log(login_data);
            
            const singinResponse = await postlogin({
                loginuser:login_data,
                methodLogin : "username"
            })
            if ('error' in singinResponse && singinResponse.error?.status !== 200) {
                    showMessage("error", "Invalid username or password")
                    return false
                 }
                 const access_token = singinResponse.data.access
                 const resfresh_token = singinResponse.data.refresh
                 localStorage.setItem(ACCESS_TOKEN, access_token)
                 localStorage.setItem(REFRESH_TOKEN, resfresh_token)
                 window.location.href = "/otp_verification"
                return true

        } catch {

        }}
    const SinguponFinishFailed: FormProps<SingupType>['onFinishFailed'] = (errorInfo) => {
        showMessage("warning", "Please fill all required fields.")
        console.log('Validation Failed:', errorInfo);
    };
    return {
        SinguponFinish,
        SinguponFinishFailed,
        SingupisLoading,
    };
}