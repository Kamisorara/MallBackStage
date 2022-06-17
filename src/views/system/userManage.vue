<template>
	<div>
		<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="line-height: 50px;">
			<el-tab-pane label="用户管理" name="first">
				<div class="head" style="display: flex;">
					<el-card shadow="hover" style="display: flex;">
						<div style="width: 400px;height: 100px;line-height: 30px;font-size: 20px;font-weight: 600;">账号管理</div>
						<div style="height: 20px;line-height: 10px;color: crimson;">当前共（{{ userTable.length }}）个用户</div>
					</el-card>
				</div>
				<!-- 表格 -->
				<div style="margin-top: 50px;">
					<el-table :data="userTable" height="500" border style="width: 100%">
						<el-table-column prop="id" label="用户id" width="180"></el-table-column>
						<el-table-column prop="userName" label="用户名" width="190"></el-table-column>
						<el-table-column prop="nickName" label="用户昵称"></el-table-column>
						<el-table-column prop="email" label="邮箱"></el-table-column>
						<el-table-column prop="phonenumber" label="联系电话"></el-table-column>
						<el-table-column prop="status" label="用户状态">
							<template slot-scope="scope">
								<el-tag v-if="userTable[scope.$index].status === '0'" type="success">启用</el-tag>
								<el-tag v-else type="danger">禁用</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="doSomeThing" label="操作" width="120">
							<template slot-scope="scope">
								<el-button
									@click="changeUserCurrentChoose(userTable[scope.$index].id, userTable[scope.$index].status)"
									type="primary"
									icon="el-icon-edit"
									circle
								></el-button>
								<el-button type="danger" icon="el-icon-delete" circle></el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div>
					<el-dialog title="请设置用户账号状态" :visible.sync="dialogVisible" width="30%">
						<el-switch
							v-model="currentChoose.status"
							active-color="#13ce66"
							inactive-color="#ff4949"
							active-value="0"
							inactive-value="1"
							active-text="启用"
							inactive-text="禁用"
						></el-switch>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="updateStatus()">确 定</el-button>
						</span>
					</el-dialog>
				</div>
			</el-tab-pane>
			<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { getAllUserInfo, updateUserStatus } from '@/api/backStage';
export default {
	data() {
		return {
			value: '100',
			activeName: 'first',
			//用户管理界面弹窗是否显示
			dialogVisible: false,
			//用户界面当前选择的用户状态
			currentChoose: {
				id: '',
				status: ''
			},
			// 用户表格内容
			userTable: [
				{
					id: '123123123123123',
					userName: '王小虎',
					nickName: '上海市普陀区金沙江路 1518 弄',
					email: '1210281722@qq.com',
					phonenumber: 15906877873,
					status: 0
				}
			]
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		//获取用户信息列表
		AllUserInfo() {
			getAllUserInfo().then(res => {
				console.log(res);
				this.userTable = res.data.data;
			});
		},
		//改变当前选中的用户信息
		changeUserCurrentChoose(id, status) {
			this.currentChoose.id = id;
			this.currentChoose.status = status;
			this.dialogVisible = true;
		},
		//更新用户禁用状态
		updateStatus() {
			updateUserStatus(this.currentChoose.id, this.currentChoose.status).then(res => {
				console.log(res);
				this.$message({
					message: '更新用户状态成功！',
					type: 'success'
				});
				setTimeout(() => {
					this.$router.go(0); //刷新页面
				}, 500);
			});
			this.dialogVisible = false;
		}
	},
	mounted() {
		this.AllUserInfo();
	}
};
</script>
<style scoped></style>
