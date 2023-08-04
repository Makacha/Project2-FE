import {lazy} from "react";
import {IRoute} from "../interfaces";
import {
  HomeOutlined,
  ProjectOutlined,
  TeamOutlined,
  SnippetsOutlined,
  IssuesCloseOutlined,
  BarChartOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

const Home = lazy(() => import('../containers/Home'));

const CreateProject = lazy(() => import('../containers/Project/Create'));

const ListProject = lazy(() => import('../containers/Project/List'));

const DetailProject = lazy(() => import('../containers/Project/Detail'));

const ListMember = lazy(() => import('../containers/Member/List'));

const IFrameContainer = lazy(() => import('../containers/shared/IFrameContainer'));

const routes: IRoute[] = [
  {
    exact: true,
    path: '/',
    name: 'Trang chủ',
    component: Home,
    icon: HomeOutlined
  },
  {
    exact: true,
    path: '/project',
    name: 'Quản lý dự án',
    children: ['/project/list', '/project/create', '/project/setting'],
    icon: ProjectOutlined
  },
  {
    exact: true,
    path: '/project/list',
    name: 'Danh sách dự án',
    component: ListProject,
  },
  {
    exact: true,
    path: '/project/create',
    name: 'Tạo dự án mới',
    component: CreateProject,
  },
  {
    exact: true,
    path: '/project/detail/:id',
    name: 'Chi tiết dự án',
    component: DetailProject,
  },
  {
    exact: true,
    path: '/project/setting',
    name: 'Cấu hình dự án',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/member',
    name: 'Quản lý thành viên',
    children: ['/member/list', '/member/request'],
    icon: TeamOutlined
  },
  {
    exact: true,
    path: '/member/list',
    name: 'Danh sách thành viên',
    component: ListMember,
  },
  {
    exact: true,
    path: '/member/request',
    name: 'DS yêu cầu tham gia',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/doc',
    name: 'Quản lý tài liệu',
    children: ['/doc/list', '/doc/create', '/doc/request'],
    icon: SnippetsOutlined,
  },
  {
    exact: true,
    path: '/doc/list',
    name: 'Danh sách tài liệu',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/doc/create',
    name: 'Tạo tài liệu mới',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/doc/request',
    name: 'Ds tài liệu chờ duyệt',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/work',
    name: 'Quản lý công việc',
    children: ['/work/list', '/work/create', '/work/request'],
    icon: IssuesCloseOutlined,
  },
  {
    exact: true,
    path: '/work/list',
    name: 'Danh sách công việc',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/work/create',
    name: 'Tạo công việc mới',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/work/request',
    name: 'Ds công việc chờ duyệt',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/plan',
    name: 'Quản lý kế hoạch',
    children: ['/plan/list', '/plan/create'],
    icon: BarChartOutlined,
  },
  {
    exact: true,
    path: '/plan/list',
    name: 'Danh sách kế hoạch',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/plan/create',
    name: 'Tạo kế hoạch mới',
    component: IFrameContainer,
  },
  {
    exact: true,
    path: '/profile',
    name: 'Thông tin tài khoản',
    component: Home,
    icon: SolutionOutlined
  },

]

export default routes;