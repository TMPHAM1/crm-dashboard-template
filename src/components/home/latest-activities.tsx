import { UnorderedListOutlined } from '@ant-design/icons'
import { Card, List, Space } from 'antd'
import React from 'react'
import { Text } from '../layout/text';
import {LatestActivitiesSkeleton} from '@/components';
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from '@/graphql/queries';
import { useList } from '@refinedev/core';
import dayjs from 'dayjs';
import CustomAvatar from '../custom-avatar';

const LatestActivites = () => {
  console.log(process.env.NODE_ENV);
  const {data: audit, isLoading: isLoadingAudit, isError, error } = useList({
    resource: 'audits',
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    }
  })

  const dealIds = audit?.data?.map((audit) => audit?.targetId);

  const {data:deals, isLoading: isLoadingDeals} = useList({
    resource: 'deals',
    queryOptions: {enabled: !!dealIds?.length},
    pagination: {
      mode: 'off'
    },
    filters: [{field: 'id', operator: 'in', value: dealIds}],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY
    }
  })

  if(isError) {
    return null 
  }

  const isLoading = isLoadingAudit || isLoadingDeals;
  return (
    <Card
    styles={{
        header:{padding: '16px'},
        body: { padding: '0 1rem'},
    }}
    title={(
        <div
        style={{display: 'flex', alignItems: 'center', gap: '8px'}}
        >
            <UnorderedListOutlined />
            <Text size="sm" style={{marginLeft: '0.5rem'}}>
                Latest Activites
            </Text>
        </div>
    )}
    >
      {isLoading ? (
      <List
        itemLayout='horizontal'
        dataSource={Array.from({length: 5}).map((_, i) => ({id: i}))}
        renderItem={(_, index)=> (
            <LatestActivitiesSkeleton key={index}/>
        )}
      >

      </List>) :
    <List
      itemLayout='horizontal'
      dataSource={audit?.data}
      renderItem={(item)=> {
        const deal = deals?.data.find((deal)=> deal.id === String(item.targetId)) || undefined
        return (
          <List.Item key={item.targetId}>
            <List.Item.Meta
              title={dayjs(deal?.createdAt).format('MMM DD, YYYY - HH:mm')}
              avatar={
                <CustomAvatar 
                  shape="square"
                  size={48}
                  src={deal?.company.avatarUrl}
                  name={deal?.company.name}
                />
              }
              description={
                <Space size={4}>
                  <Text strong>{item?.user?.name}</Text>
                  <Text>
                    {item.action === 'CREATE' ? 'created' : 'moved'}
                  </Text>
                  <Text>Event</Text>
                  <Text>{item.action === 'CREATE' ? 'in' : 'to'}</Text>
                  <Text strong>{deal?.stage?.title}</Text>
                </Space>
              }
            />
          </List.Item>
        )
      }} ></List>} 
     
    </Card>
  )
}

export default LatestActivites
