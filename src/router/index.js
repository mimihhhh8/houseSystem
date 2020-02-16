import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HourDataList from '../components/hourDataList/hourDataList.vue'
import Dates from '../components/date/date.vue'
import Login from '../views/login/login.vue'
import Register from '../views/register/register.vue'
//添加房源
import AddHouse from '../components/addHouse/addHouse.vue'
//房源列表
import HouseList from '../components/houseList/houseList.vue'
//房源
import HousingResource from '../components/housingResource/housingResource.vue'
//定价
import FixPrice from '../components/fixPrice/fixPrice.vue'
//商机
import Business from '../components/business/business.vue'
//租房
import RentHouse from '../components/rentHouse/rentHouse.vue'
//合同
import Contract from '../components/contract/contract.vue'
//费用
import Cost from '../components/cost/cost.vue'
//预约看房
import OrderLookHouse from '../components/orderLookHouse/orderLookHouse.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/home/hourDataList"
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        flag: true,
        requiredAuth: false
      },
      children: [
        {
          path: '/home/hourDataList',
          name: 'hourDataList',
          component: HourDataList,
          meta: {
            flag: true,
            requiredAuth: false
          },
        },
        {
          path: '/home/date',
          name: 'date',
          component: Dates,
          meta: {
            flag: true,
            requiredAuth: false
          },
        },
        // 房源
        {
          path: '/home/housingResource',
          name: 'housingResource',
          component: HousingResource,
          meta: {
            flag: true,
            requiredAuth: false
          }
        },
        //添加房源
        {
          path: '/home/addHouse',
          name: 'addHouse',
          component: AddHouse,
          meta: {
            flag: true,
            requiredAuth: false
          }
        },
        //房源列表
        {
          path: '/home/houseList',
          name: 'houseList',
          component: HouseList,
          meta: {
            flag: true,
            requiredAuth: false
          }
        },
        //定价管理
        {
          path: '/home/fixPrice',
          name: 'fixPrice',
          component: FixPrice,
          meta: {
            flag: true,
            requiredAuth: false
          },
        },
        //商机管理
        {
          path: '/home/business',
          name: 'business',
          component: Business,
          meta: {
            flag: true,
            requiredAuth: false
          },
        },
        //租房申请------租户信息
        {
          path: '/home/rentHouse',
          name: 'rentHouse',
          component: RentHouse,
          props: true,
          meta: {
            flag: true,
            requiredAuth: false
          },
        },
        //合同管理
        {
          path: '/home/contract',
          name: 'contract',
          component: Contract,
          meta: {
            flag: true,
            requiredAuth: false
          },
        },
        //费用
        {
          path: '/home/cost',
          name: 'cost',
          component: Cost,
          meta: {
            flag: true,
            requiredAuth: false
          },
        },
        //预约看房
        {
          path:'/home/orderLookHouse',
          name:'orderLookHouse',
          component:OrderLookHouse
        }
      ]
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token =Cookies.get('userInfo')
  if (token) {
    next();
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }
})


export default router
