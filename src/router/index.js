import Vue from 'vue'
import VueRouter from 'vue-router'
import userManage from '../views/system/userManage.vue'
import sellerManage from '../views/system/sellerManage.vue'
import commodityManage from '../views/system/commodityManage.vue'
// const Login = () => import('../views/Login.vue')
Vue.use(VueRouter)
const routes = [{
		path: '/person',
		name: 'Person',
		component: () => import('../views/person.vue')
	},
	{
		path: '/',
		name: 'Login',
		component: () => import('../views/login.vue')
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		children: [{
				path: '/index',
				name: 'index',
				component: () => import('../views/Index.vue')
			},
			{
				path: '/system/userManage',
				name: "userManage",
				component: userManage
			},
			{
				path: '/system/sellerManage',
				name: "sellerManage",
				component: sellerManage,
			}, {
				path: '/system/commodityManage',
				name: "commodityManage",
				component: commodityManage,
			},
			{
				path: '/system/systemLoad',
				name: 'systemLoad',
				component: () => import('../views/system/systemLoad.vue')
			},
			{
				path: '/system/inventoryManage',
				name: "inventoryManage",
				component: () => import('../views/system/inventoryManage.vue')
			}
		],
	},
]

const router = new VueRouter({
	routes,
})

router.beforeEach((to, from, next) => {

	// to and from are both route objects. must call `next`.
	next()
})
export default router
