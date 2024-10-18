import MainLayout from '../components/Layout/MainLayout';
import SimpleLayout from '../components/Layout/SimpleLayout';
import BlockAddForm from '../components/Block/BlockAddForm/BlockAddForm';

import BlockUpdateForm from '../components/Block/BlockUpdateForm/BlockUpdateForm';
import AddFarmForm from '../components/Farm/FarmForm/AddFarmForm';
import LoginPage from '../pages/Auth/LoginPage';
import BlockPage from '../pages/Block/BlockPage';
import FarmPage from '../pages/Farm/FarmPage';
import SingleFarmPage from '../pages/Farm/SingleFarmPage';
import HomePage from '../pages/Home/HomePage';
import Blogs from '../pages/Blogs/Blogs';
import AnimalPage from '../pages/Animal/AnimalPage';
import TransactionPage from '../pages/Transaction/TransactionPage';
import UserList from '../components/User/UserList';

const routes = [
  {
    layout: MainLayout,
    data: [
      {
        path: '/',
        isIndex: true,
        component: HomePage,
      },
      {
        path: '/farm',
        component: FarmPage,
      },
      {
        path: '/blogs',
        component: Blogs,
      },
      {
        path: '/farm/:farmId',
        component: SingleFarmPage,
      },
      {
        path: '/farm/create',
        component: AddFarmForm,
      },
      {
        path: '/block',
        component: BlockPage,
      },
      {
        path: `/block/:blockId`,
        component: BlockUpdateForm,
      },
      {
        path: `/block/create`,
        component: BlockAddForm,
      },
      {
        path: '/animal',
        component: AnimalPage,
      },
      {
        path: '/transaction',
        component: TransactionPage,
      },
      {
        path: '/users',
        component: UserList,
      },
    ],
  },
  {
    layout: SimpleLayout,
    data: [
      {
        path: '/login',
        component: LoginPage,
      },
    ],
  },
];

export default routes;
