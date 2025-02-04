import  {useState} from 'react';
import {Popover, Button} from 'antd'
import CustomAvatar from '../custom-avatar'
import {AccountSettings} from './account-settings';
import { useGetIdentity } from '@refinedev/core'
import type {User} from '@/graphql/schema.types';
import { Text } from './text';
import { SettingOutlined } from '@ant-design/icons';
import React from 'react';

const CurrentUser = () => {
const [isOpen, setIsOpen] = useState(false);
 const {data: user} = useGetIdentity<User>() // Hook that will grab from Auth Proivder that will get the user Information, provides all the requested auth information 

 const content = (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column'
        }}
    >
        <Text
            strong
            style={{padding: '12px 20px'}}
        >
            {user?.name}
        </Text>
        <div
          style={{
            borderTop: '1px solid #d9d9d9',
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px,'
          }}  
        >
            <Button
                style={{textAlign: 'left'}}
                icon={<SettingOutlined />}
                type="text"
                block
                onClick={()=> {setIsOpen(true)}}
            >
                Account Settings
            </Button>
        </div>
    </div>
 )
  return (
    <>
    <Popover
        placement='bottomRight'
        trigger="click"
        overlayInnerStyle={{padding: 0}}
        overlayStyle={{zIndex: 999}}
        content={content}
    >
      <CustomAvatar 
        name={user?.name}
        src={user?.avatarUrl}
        size="default"
        style={{cursor: "pointer"}}
     />
    </Popover>
    {user && 
        <AccountSettings 
        opened={isOpen}
        userId={user.id}
        setOpened={setIsOpen}
        />}
    </>
  )
}

export default CurrentUser
