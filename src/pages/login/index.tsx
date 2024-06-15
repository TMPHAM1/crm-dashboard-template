import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../providers";
import logo from '../../assets/irrc-reverse.svg'
import Image from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";



export const Login = () => {
  const image =  <img 
  style={{
    width: "30%",
    minWidth: "350px"
  }}
  src={logo}></img>
  const title = <>
   {image}
  </>
  
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: authCredentials
      }}
      title={title}
    />
  );
};
