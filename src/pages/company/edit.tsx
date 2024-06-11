import { businessTypeOptions, companySizeOptions, industryOptions } from '@/components/constants'
import CustomAvatar from '@/components/custom-avatar'
import SelectOptionWithAvatar from '@/components/select-option-with-avatar'
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import { UsersSelectQuery } from '@/graphql/types'
import { getNameInitials } from '@/utilities'
import { Edit, useForm} from '@refinedev/antd'
import { useSelect } from '@refinedev/antd'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import React from 'react'
import { CompanyContactsTable } from './contacts-table'

const EditPage = () => {
  const {saveButtonProps, formProps, formLoading, queryResult} = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION
    }
  })
  const {selectProps, queryResult: queryResultUsers} = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: 'users',
    optionLabel: 'name',
    pagination: {
      mode: 'off'
    },
    meta: {
        gqlQuery: USERS_SELECT_QUERY,
    }
  })
  console.log('THIS IS QUERY RESULT', queryResult)
  const {avatarUrl, name} = queryResult?.data?.data || {}
  console.log('THIS IS AVATAR URL', avatarUrl)
  return (
    <div>
      <Row  gutter={[32, 32]}>
        <Col xs={24} xl={24}>
        <Edit
          isLoading={formLoading}
          saveButtonProps={saveButtonProps}
          breadcrumb={false}
        >
        <Form {...formProps} layout="vertical">
              <CustomAvatar shape="square" src={avatarUrl} name={getNameInitials(name || '') } style={{width:96, height: 96, marginBottom: '24px'}} />
              <Form.Item
                    label="Sales Owner"
                    name="salesOwnerId"
                    initialValue={formProps?.initialValues?.salesOwner?.id}
                >
                    <Select
                        placeholder="Please select a sales owner"
                        {...selectProps}
                        options={
                          queryResultUsers.data?.data.map((user: any)=> ({
                                value: user.id,
                                label: (<SelectOptionWithAvatar
                                    name={user.name} 
                                    avatarUrl={user.avatarUrl ?? undefined}
                                    shape="circle"
                                    />)
                            }))
                        }
                    />
                </Form.Item>
                <Form.Item>
                  <Select options={companySizeOptions}></Select>
                </Form.Item>
                <Form.Item>
                  <InputNumber
                    autoFocus
                    addonBefore="$"
                    min={0}
                    placeholder="0.00"
                  ></InputNumber>
                </Form.Item>
                <Form.Item label="Industry">
                  <Select options={industryOptions}></Select>
                </Form.Item>
                <Form.Item label="Business Type">
                  <Select options={businessTypeOptions}></Select>
                </Form.Item>
                <Form.Item label="Country" name="country">
                  <Input placeholder='Country'></Input>
                </Form.Item>
                <Form.Item label="Website">
                  <Input placeholder='Website' name="website"></Input>
                </Form.Item>
        </Form>
        </Edit>
        <div style={{marginTop: "32px"}}>
        <Row gutter={[32,32]}>
        <Col
          xs={24} xl={24}
        >
                <CompanyContactsTable /></Col>
                </Row>
                </div>
        </Col>
        
      </Row>
      
    </div>
  )
}

export default EditPage
