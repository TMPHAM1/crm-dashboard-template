import { ThemedLayoutV2, ThemedTitleV2, } from "@refinedev/antd"
import logo from '../../assets/favicon.jpg'
import Header from './header'
import Icon from "@ant-design/icons/lib/components/Icon"
import { Text } from "./text"

const Layout = ({children}: React.PropsWithChildren) => {
  const image = () => 
  <img 
  style={{
    borderRadius: "5px",
    marginRight: "1rem",
    height: "24",
    width: "24px",
  }}
  src={logo} />
  return (
    <div>
      <ThemedLayoutV2
        Header={Header}
        Title={(titleProps) => {
          
          return <ThemedTitleV2 {...titleProps} icon={<Icon width="96px" height="96px" component={image} />} text={<Text size="sm" style={{textAlign: "center"}}>Iowa Reading Research Center</Text>}/>}}
        >
        {children}
      </ThemedLayoutV2>
    </div>
  )
}

export default Layout
