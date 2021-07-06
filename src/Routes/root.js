import UpdateMyPassword from '../Pages/UpdateMyPassword'
import MyTeam from '../Pages/MyTeam'
import MyInfo from '../Pages/MyInfo'
import Home from '../Pages/Home'
import VehicleManager from '../Pages/Vehicle/Manager'
import MaintenanceManager from '../Pages/MaintenanceOrder/Manager'
import DriverManager from '../Pages/Driver/Manager'
import VehicleTypeMananger from '../Pages/VehicleType/Manager'
import BranchManager from '../Pages/Branch/Manager'
import OperationManager from '../Pages/Operation/Manager'
import MaintenanceManagerMobile from '../Pages/MaintenanceManagerMobile/Manager'
import MaintenanceDetailMobile from '../Pages/MaintenanceDetailMobile'

const RootRoutes = [
  {
    component: MaintenanceManagerMobile,
    title: '',
    path: '/logged/mobile-maintenance',
    exact: true,
    goBack: true
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
  {
    component: MaintenanceManager,
    title: 'MANUTENÇÃO',
    path: '/logged/maintenance/manager',
    exact: true,
    goBack: false,
  },
  {
    component: DriverManager,
    title: 'MOTORISTA',
    path: '/logged/driver/manager',
    exact: true,
    goBack: false,
  },
  {
    component: VehicleTypeMananger,
    title: 'TIPO VEÍCULO',
    path: '/logged/fleet/manager',
    exact: true,
    goBack: false,
  },
  {
    component: BranchManager,
    title: 'UNIDADE',
    path: '/logged/branch/manager',
    exact: true,
    goBack: false,
  },
  {
    component: OperationManager,
    title: 'OPERAÇÃO',
    path: '/logged/operation/manager',
    exact: true,
    goBack: false,
  },
  {
    component: MaintenanceDetailMobile,
    title: '',
    path: '/logged/mobile-maintenance-detail/:id',
    exact: true,
    goBack: false,
  },
]

export default RootRoutes
