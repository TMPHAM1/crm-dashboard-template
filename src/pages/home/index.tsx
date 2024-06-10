import { Col, Row } from "antd"
import { UpcomingEvents, EventsChart, DashboardTotalCountCards } from "@/components"
import { useCustom } from "@refinedev/core"
import LatestActivites from "@/components/home/latest-activities"
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries"

export const Home = () => {
  const {data, isLoading} = useCustom({
    url: '',
    method: 'get',
    meta: {
        gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
    }
  })
  return (
    <div>
      <Row
        gutter={[32,32]}
      >
        <Col xs={24} sm={24} xl={8}> 
            <DashboardTotalCountCards 
                resource="companies"
                isLoading={isLoading}
                totalCount={data?.data.companies.totalCount}
            />
        </Col>
        <Col xs={24} sm={24} xl={8}> 
            <DashboardTotalCountCards 
                resource="contacts"
                isLoading={isLoading}
                totalCount={data?.data.contacts.totalCount}
            />
        </Col>
        <Col xs={24} sm={24} xl={8}>
            <DashboardTotalCountCards 
                resource="deals"
                isLoading={isLoading}
                totalCount={data?.data.deals.totalCount}
            />
        </Col>
      </Row>
      <Row
        gutter={[32,32]}
        style={{
            marginTop: '32px'
        }}
      > 
        <Col
            xs={24}
            sm={24}
            xl={8}
            style={{
                height:'460px'
            }}
        >
            <UpcomingEvents />
        </Col>
        <Col
            xs={24}
            sm={24}
            xl={16}
            style={{
                height:'460px'
            }}
        >
          <EventsChart />
        </Col>
      </Row>
      <Row
        gutter={[32,32]}
        style={{
            marginTop: '32px'
        }}
      > 
        <Col
            xs={24}
        >
            <LatestActivites />
        </Col>
      </Row>
    </div>
  )
}


