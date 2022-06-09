<template>
	<el-container>
		<el-aside width="200px">
			<!-- 引用 -->
			<SideMenu></SideMenu>
		</el-aside>
		<el-container>
			<el-header>
				<strong>KamisoraMall后台管理系统</strong>
				<div class="header-avatar">
					<el-avatar src="https://img1.baidu.com/it/u=1597559309,913966834&fm=253&fmt=auto&app=138&f=JPEG?w=748&h=500"></el-avatar>

					<el-dropdown>
						<span class="el-dropdown-link">
							{{ username }}
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown"><el-dropdown-item @click.native="logout">退出</el-dropdown-item></el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-header>
			<el-main>
				<!-- 让Index页面显示出来 -->
				<div style="margin: 0 5px"><router-view></router-view></div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import SideMenu from './inc/SideMenu'; //引用组件
import { getUser, logout } from '@/api/user';
export default {
	components: { SideMenu },
	name: 'Home',
	data() {
		return {
			isLogin: false,
			username: '',
			userId: ''
		};
	},
	methods: {
		//根据token获取用户信息
		getUserInfo() {
			if (localStorage.getItem('token') != null) {
				getUser()
					.then(res => {
						console.log(res);
						if (res.data.code === 200) {
							this.isLogin = true;
							this.username = res.data.data[1];
							this.userId = res.data.data[0];
						}
					})
					.catch(err => {
						console.error(err);
						this.$message({
							message: '请重新登录',
							type: 'error'
						});
						this.clearMethod();
						this.$router.push('/');
					});
			}
		},
		//退出操作
		logout() {
			logout()
				.then(res => {
					this.clearMethod();
					this.$store.commit('resetState'); //调用store里面的方法来清空token
					this.$message({
						message: res.data.msg,
						type: 'success'
					});
					this.$router.push('/')
				})
				.catch(err => {
					console.error(err);
				});
		},
		//清除localStorage中的token 和userName
		clearMethod() {
			localStorage.clear();
			sessionStorage.clear();
		}
	},
	mounted() {
		this.getUserInfo();
	}
};
</script>
<style scoped>
.header-avatar {
	float: right;
	display: flex;
	width: 180px;
	justify-content: space-around;
	align-items: center;
}

.el-dropdown-link {
	cursor: pointer;
}

.el-container {
	padding: 0;
	margin: 0;
	height: 100vh;
}

.el-header {
	background-color: #35ace8;
	color: #333;
	text-align: center;
	line-height: 60px;
}

.el-aside {
	background-color: #d3dce6;
	color: #333;
	line-height: 200px;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	line-height: 160px;
}
a {
	text-decoration: none;
}
</style>
