import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";


export const resources: IResourceItem[] = [
    {
        name: 'dashboard',
        list: '/',
        meta: {
            label: 'Dashboard',
            icon: <DashboardOutlined />
        }
    },
    {
        name: 'companies',
        list: '/companies',
        show: '/companies/:id',
        create: '/companies/new',
        edit: '/companies/edit/:id',
        meta: {
            label: 'Companies',
            icon: <ShopOutlined />
        }
    },
    {
        name: 'events',
        list: '/events',
        show: '/events/:id',
        create: '/events/new',
        edit: '/events/edit/:id',
        meta: {
            label: 'Events',
            icon: <ProjectOutlined />
        }
    }
]