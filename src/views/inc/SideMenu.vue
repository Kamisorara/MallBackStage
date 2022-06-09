<template>
	<el-menu default-active="0" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<router-link to="/index">
			<el-menu-item index="0">
				<template slot="title">
					<i class="el-icon-s-shop"></i>
					<span>首页</span>
				</template>
			</el-menu-item>
		</router-link>
		<el-submenu :index="menu.name" v-for="(menu, index) in menuList" :key="index">
			<template slot="title">
				<i :class="menu.icon"></i>
				<span>{{ menu.title }}</span>
			</template>
			<router-link :to="item.path" v-for="(item, index) in menu.children" :key="index">
				<el-menu-item :index="item.name">
					<template slot="title">
						<i :class="item.icon"></i>
						<span>{{ item.title }}</span>
					</template>
				</el-menu-item>
			</router-link>
		</el-submenu>
	</el-menu>
</template>

<script>
export default {
	name: 'SideMenu',
	data() {
		return {
			menuList: [
				{
					title: ' 系统管理',
					name: 'SysManage',
					icon: 'el-icon-setting',
					path: '',
					children: [
						{
							title: '用户管理',
							name: 'userManage',
							icon: 'el-icon-user',
							path: '/system/userManage',
						},
						{
							title: '商家管理',
							name: 'sellerManage',
							icon: 'el-icon-bank-card',
							path: '/system/sellerManage',
						},
						{
							title: '系统负载',
							name: 'systemLoad',
							icon: 'el-icon-s-platform',
							path: '/system/systemLoad',
						}
					]
				},
				{
					title: '商城管理',
					name: 'SysBookManage',
					icon: 'el-icon-office-building',
					path: '/system/userCenter',
					children: [
						{
							title: '商品管理',
							name: 'SysBooks',
							icon: 'el-icon-sell',
							path: '/system/commodityManage'
						},
						{
							title: '商品库存管理',
							name: 'inventoryManage',
							icon: 'el-icon-shopping-cart-full',
							path: '/system/inventoryManage'
						}
					]
				}
			]
		};
	},
	methods: {}
};
</script>
<style scoped>
.el-menu-vertical-demo {
	height: 100vh;
}
</style>
