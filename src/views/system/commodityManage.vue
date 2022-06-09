<template>
	<div class="commodityManage" style="width: 100%;height:790px;background-color:#f4f4f4;">
		<div style="width: 600px;">
			<el-card shadow="hover">
				<span style="font-size: 25px;font-weight: 600;color: coral;">当前共({{ CommodityList.length }})件商品</span>
				<el-button type="primary" plain style="margin-left: 250px;" @click="dialogFormVisible = true">添加商品</el-button>
			</el-card>
		</div>
		<div class="table" style="margin-top: 30px;">
			<el-table :data="CommodityList" style="width: 100%" max-height="600">
				<el-table-column fixed prop="id" label="商品唯一id" width="150"></el-table-column>
				<el-table-column prop="shopName" label="商品名称" width="250"></el-table-column>
				<el-table-column prop="originalPrice" label="原价￥" width="120"></el-table-column>
				<el-table-column prop="price" label="现价￥" width="120"></el-table-column>
				<el-table-column prop="addr" label="配送地址" width="200"></el-table-column>
				<el-table-column prop="mainPhoto" label="商品图片链接" width="120">
					<template slot-scope="scope">
						<img :src="CommodityList[scope.$index].mainPhoto" width="100px" height="120px" />
					</template>
				</el-table-column>
				<el-table-column prop="pinkage" label="是否包邮(0不包,1包)" width="120"></el-table-column>
				<el-table-column prop="type" label="商品类型" width="200"></el-table-column>
				<el-table-column prop="doSomeThing" label="操作" width="120">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" circle></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 弹框表单 -->
		<el-dialog title="请输入添加商品的信息:" :visible.sync="dialogFormVisible">
			<el-form :model="commodityform" :rules="rules" ref="commodityform">
				<el-form-item label="商品名称" prop="shopName" label-width="200px">
					<el-input v-model="commodityform.shopName" autocomplete="off" style="width: 400px;"></el-input>
				</el-form-item>
				<el-form-item label="商品原价 ￥" prop="originalPrice" label-width="200px">
					<el-input v-model="commodityform.originalPrice" autocomplete="off" style="width: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="商品现价 ￥" prop="price" label-width="200px">
					<el-input v-model="commodityform.price" autocomplete="off" style="width: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="评论数(可不填)"label-width="200px">
					<el-input v-model="commodityform.mark" autocomplete="off" style="width: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="销售数(可不填)" label-width="200px">
					<el-input v-model="commodityform.sell" autocomplete="off" style="width: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="配送地址(可不填)" label-width="200px">
					<el-input v-model="commodityform.addr" autocomplete="off" style="width: 500px;"></el-input>
				</el-form-item>
				<el-form-item label="商品封面链接" prop="mainPhoto" label-width="200px">
					<el-input v-model="commodityform.mainPhoto" autocomplete="off" style="width: 500px;"></el-input>
				</el-form-item>
				<el-form-item label="是否包邮(默认不包邮)" label-width="200px">
					<el-radio v-model="commodityform.pinkage" label="0">不包邮</el-radio>
					<el-radio v-model="commodityform.pinkage" label="1">包邮</el-radio>
				</el-form-item>
				<el-form-item label="商品类型" prop="type" label-width="200px">
					<el-cascader v-model="commodityform.type" :options="typeOptions" :props="{ expandTrigger: 'hover' }"></el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('commodityform')">取 消</el-button>
				<el-button type="primary" @click="submitForm('commodityform')">添 加</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { getAllCommodity } from '@/api/shop';
import { insertCommodity } from '@/api/backStage';
export default {
	data() {
		return {
			//商品列表
			CommodityList: [
				{
					id: '123123123123',
					shopName: '商品名称',
					originalPrice: '999',
					price: '999',
					addr: '上海市普陀区金沙江路 1518 弄',
					mainPhoto: 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i4/3015107655/O1CN01nMBnQd26Q2dAB0bf4_!!0-item_pic.jpg_580x580Q90.jpg_.webp',
					pinkage: 1,
					type: '食品'
				}
			],
			//弹框是否显示
			dialogFormVisible: false,
			//添加商品类型Form
			commodityform: {
				shopName: '',
				originalPrice: '',
				price: '',
				addr: '',
				mainPhoto: '',
				type: '',
				pinkage: '',
				mark: '',
				sell: ''
			},
			//商品类型列表
			typeOptions: [
				{
					label: '食品',
					value: '食品',
					children: [
						{
							label: '零食',
							value: '零食'
						}
					]
				},
				{
					label: '电子产品',
					value: '电子产品',
					children: [
						{
							label: '相机',
							value: '相机',
							children: [
								{
									label: '数码相机',
									value: '数码相机'
								},
								{
									label: '单反相机',
									value: '单反相机'
								},
								{
									label: '拍立得',
									value: '拍立得'
								},
								{
									label: '旁轴相机',
									value: '旁轴相机'
								},
								{
									label: '微单/单电',
									value: '单反相机'
								},
								{
									label: '特殊相机',
									value: '特殊相机'
								}
							]
						},
						{
							label: '电脑',
							value: '电脑',
							children: [
								{
									label: '显卡',
									value: '显卡'
								},
								{
									label: 'CPU',
									value: 'CPU'
								},
								{
									label: '硬盘',
									value: '硬盘'
								},
								{
									label: '主机',
									value: '主机'
								}
							]
						}
					]
				},
				{
					label: '养生',
					value: '养生'
				},
				{
					label: '服装',
					value: '服装'
				},
				{
					label: '家电',
					value: '家电'
				},
				{
					label: '医药',
					value: '医药'
				}
			],
			//表单提交规则
			rules: {
				shopName: [
					{
						required: true,
						message: '商品名称不能为空',
						trigger: 'blur'
					}
				],
				originalPrice: [
					{
						required: true,
						message: '商品原价不能为空',
						trigger: 'blur'
					}
				],
				price: [
					{
						required: true,
						message: '商品现价不能为空',
						trigger: 'blur'
					}
				],
				mainPhoto: [
					{
						required: true,
						message: '商品封面链接不能为空',
						trigger: 'blur'
					}
				],
				type: [
					{
						required: true,
						message: '商品类型不能不选',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		//获取所有商品列表
		getAllCommodties() {
			getAllCommodity().then(res => {
				console.log(res);
				this.CommodityList = res.data.data;
			});
		},
		//重置表单
		resetForm(commodityform) {
			this.$refs[commodityform].resetFields(); //重置表单数据
			this.dialogFormVisible = false; //重置表单的同时关闭弹窗
		},
		//提交表单
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				//表单提交成功操作
				if (valid) {
					this.commodityform.type = this.commodityform.type.join('-'); //后端接口接收的type类型为string类型 所以只能转换为字符串再传
					insertCommodity(this.commodityform).then(res => {
						console.log(res);
					});
					//表单提交完毕后重置表单
					this.resetForm(formName);
				} else {
					console.log('表单提交失败!');
					this.resetForm(formName);
					return false;
				}
			});
		}
	},
	mounted() {
		this.getAllCommodties();
	}
};
</script>
<style scoped></style>
