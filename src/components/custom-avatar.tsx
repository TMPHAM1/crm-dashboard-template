import { getNameInitials } from '@/utilities'
import {Avatar as AntdAvatar, AvatarProps} from 'antd'

type Props = AvatarProps & {
    name?: string
}
const CustomAvatar = ({name, style, ...rest}: Props) => {
  return (
    <div>
      <AntdAvatar
        alt={'Javascript Mastery'}
        size="small"
        style={{
            backgroundColor: '#87d068',
            display: 'flex',
            alignItems: 'center',
            border: 'none',  
            ...style  
        }}
        {...rest}
      >
        {getNameInitials(name || '')}
      </AntdAvatar>
    </div>
  )
}

export default CustomAvatar
