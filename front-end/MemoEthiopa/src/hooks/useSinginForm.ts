import { FormProps } from 'antd';
import { SinginType } from '../Pages/type';
import { usePostloginMutation } from '../services/auth/login';
import { useMessage } from '../components/useMessage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../config';


interface LoginFormType {
  usernameoremail: string,
  password: string
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const useSigninForm = () => {
  const [postLogin, { isLoading }] = usePostloginMutation();
  const SinginisLoading = isLoading
  const showMessage = useMessage()
  const SinginonFinish: FormProps<LoginFormType>['onFinish'] = async (values: LoginFormType) => {
    if (emailRegex.test(values.usernameoremail)) {
      // showMessage("warning","Please use your user name email login get error 500")
      try {
        // Make the login request using email method
        const data = {
          email: values.usernameoremail,
          password: values.password
        }
        const emailResponse = await postLogin({
          loginuser: data,
          methodLogin: "email",
        }).unwrap();

        const access_token = emailResponse.access
        const resfresh_token = emailResponse.refresh
        localStorage.setItem(ACCESS_TOKEN, access_token)
        localStorage.setItem(REFRESH_TOKEN, resfresh_token)
        window.location.href = "/otp_verification"
        // Display success message if login is successful
        showMessage("success", "Login Success");
        return true
      } catch (error: any) {
        // Handle errors and display error message if login fails
        showMessage("error", error?.data?.detail || "Login failed. Please try again.");
        console.error("Login Error:", error);
      }

    } else {
      const data = {
        username: values.usernameoremail,
        password: values.password
      }
      const usernameResponse = await postLogin({
        loginuser: data,
        methodLogin: "username"
      })
      if ('error' in usernameResponse && usernameResponse.error?.status !== 200) {
        showMessage("error", "Invalid username or password")
        return false
      }
      const access_token = usernameResponse.data.access
      const resfresh_token = usernameResponse.data.refresh
      localStorage.setItem(ACCESS_TOKEN, access_token)
      localStorage.setItem(REFRESH_TOKEN, resfresh_token)
      window.location.href = "/otp_verification"
      showMessage("success", "Login Success");
      return true
    }
  };

  const SinginonFinishFailed: FormProps<SinginType>['onFinishFailed'] = (errorInfo) => {
    showMessage("warning", "Please fill all required fields.")
    console.log('Validation Failed:', errorInfo);
  };

  return {
    SinginonFinish,
    SinginonFinishFailed,
    SinginisLoading,
  };
};
