import UpdateMyPassword from '../Pages/UpdateMyPassword'
import MyTeam from '../Pages/MyTeam'
import Onboarding from '../Pages/Onboarding'
import MyInfo from '../Pages/MyInfo'
import Home from '../Pages/Home'
import VehicleManager from '../Pages/Vehicle/Manager'

const RootRoutes = [
  {
    component: Onboarding,
    path: '/user/onboarding',
    exact: true,
  },
  {
    component: MyInfo,
    title: 'MINHA CONTA',
    path: '/logged/account-myinfo',
    exact: true,
    goBack: true
  },
  {
    component: MyTeam,
    title: 'MINHA EQUIPE',
    path: '/logged/account-myteam',
    exact: true,
    goBack: true
  },
  {
    component: UpdateMyPassword,
    title: 'ALTERAR SENHA',
    path: '/logged/account-password',
    exact: true,
    goBack: true
  },
  {
    component: VehicleManager,
    title: 'VEÍCULOS',
    path: '/logged/vehicle/manager',
    exact: true,
    goBack: false
  },
  {
    component: Home,
    title: 'DASHBOARD',
    path: '/logged/dashboard',
    exact: true,
  },

]

export default RootRoutes
