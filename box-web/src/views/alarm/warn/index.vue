<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-user-search">
				<el-form :inline="true" ref="userSearchRef" :model="state.tableData.param.query" size="default">
					<el-row>
						<el-form-item label="子域名" class="ml20" size="default">
							<el-input v-model="state.tableData.param.query.account" placeholder="请输入子域名" clearable
								style="max-width: 180px"></el-input>
						</el-form-item>
						<el-form-item label="URL" class="ml20" size="default">
							<el-input v-model="state.tableData.param.query.userName" placeholder="请输入URL" clearable
								style="max-width: 180px"></el-input>
						</el-form-item>
						<!-- <el-form-item label="用户昵称" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.nickName" placeholder="请输入用户昵称" clearable
                        style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" class="ml20" size="default">
              <el-input v-model="state.tableData.param.query.phone" placeholder="请输入手机号码" clearable
                        style="max-width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="用户性别" class="ml20" prop="sex"> -->
						<!-- 在版本 2.5.0之后， el-select 的默认宽度更改为 100% 当使用内联形式时，宽度将显示异常。 为了保持显示正常, 您需要手动配置 el-select 的宽度 -->
						<!-- <el-select v-model="state.tableData.param.query.sex" placeholder="请选择用户性别" clearable style="width: 180px">
                <el-option
                    v-for="dict in sys_user_sex"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="帐号状态" class="ml20" prop="status">
              <el-select v-model="state.tableData.param.query.status" placeholder="请选择帐号状态" clearable style="width: 180px">
                <el-option
                    v-for="dict in sys_status"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                />
              </el-select>
            </el-form-item> -->
						<el-button size="default" type="primary" class="ml20" @click="getTableData">
							<el-icon><ele-Search /></el-icon> 查询
						</el-button>
						<el-button size="default" class="ml20" @click="resetQuery">
							<el-icon><ele-Refresh /></el-icon> 重置
						</el-button>
						<el-button size="default" type="success" class="ml20" @click="onOpenAdd('add')">
							<el-icon><ele-FolderAdd /></el-icon> 新增
						</el-button>
						<el-row :gutter="35">
							<!-- 批量查询功能,效果未知 -->
							<el-button size="default" type="success" plain class="ml30" @click="onOpenAdd('add')">
								<el-icon><ele-FolderAdd /></el-icon> 批量查询
							</el-button>
						</el-row>
					</el-row>
				</el-form>
			</div>
			<el-table border :data="state.tableData.records" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column type="index" label="序号" width="60" align="center" />
				<el-table-column label="confidence" prop="confidence" show-overflow-tooltip align="center" />
				<el-table-column label="URL" prop="pic_url" show-overflow-tooltip align="center" />
				<!-- 不用的先注掉 -->
				<!-- <el-table-column label="用户昵称" prop="nickName" show-overflow-tooltip align="center" />
        <el-table-column label="用户邮箱" prop="fingerprint" show-overflow-tooltip align="center" />
        <el-table-column label="手机号码" prop="phone" show-overflow-tooltip align="center" />
        <el-table-column label="用户性别" prop="sex" show-overflow-tooltip align="center">
          <template #default="scope">
            <el-tag :type="sys_user_sex[scope.row.sex].elTagType">{{ sys_user_sex[scope.row.sex].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="帐号状态" prop="status" show-overflow-tooltip align="center">
          <template #default="scope">
            <el-tag :type="sys_status[scope.row.status].elTagType">{{ sys_status[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间" prop="loginDate" show-overflow-tooltip align="center">
          <template #default="scope">
            <span>{{ parseDateTime(scope.row.loginDate) }}</span>
          </template>
        </el-table-column> -->
				<el-table-column label="火灾类型" prop="fire_type" show-overflow-tooltip align="center" />
				<el-table-column label="通知时间" prop="record_time" show-overflow-tooltip align="center" />
				<el-table-column label="通知" width="100" align="center">
					<template #default="scope">
						<el-button v-if="auth('system:user:update')" size="small" text type="primary"
							@click="onOpenEdit('edit', scope.row)">修改</el-button>
					</template>
				</el-table-column>
				<el-table-column label="删除" width="100" align="center">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="state.tableData.param.page.current"
				background v-model:page-size="state.tableData.param.page.size"
				layout="total, sizes, prev, pager, next, jumper" :total="state.tableData.total">
			</el-pagination>
		</el-card>
		<UserDialog ref="userDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="user">
import { defineAsyncComponent, reactive, onMounted, ref, nextTick, getCurrentInstance } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useUserApi } from '/@/api/system/user';
import { parseDateTime } from '/@/utils/formatTime';
import { auth } from '/@/utils/authFunction';

// 获取字典
const { proxy } = getCurrentInstance();
const { sys_status, sys_user_sex } = proxy.parseDict('sys_status', 'sys_user_sex');

// 引入组件
const UserDialog = defineAsyncComponent(() => import('./dialog.vue'));

// 定义变量内容
const userDialogRef = ref();
const userSearchRef = ref();
const useUser = useUserApi();
const state = reactive({
	tableData: {
		records: [],
		total: 0,
		loading: false,
		param: {
			page: {
				current: 1,
				size: 10,
			},
			query: {
				openId: '',
				account: '',
				userName: '',
				nickName: '',
				userType: '',
				phone: '',
				sex: '',
				status: '',
			},
		},
	},
});

// 初始化表格数据
const getTableData = () => {
	state.tableData.loading = true;
	useUser.getPageList(state.tableData.param).then((res) => {
		state.tableData.records = res.records;
		state.tableData.total = res.total;
	});
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增用户中心-用户信息弹窗
const onOpenAdd = (type: string) => {
	userDialogRef.value.openDialog(type);
};
// 打开修改用户中心-用户信息弹窗
const onOpenEdit = (type: string, row) => {
	userDialogRef.value.openDialog(type, row);
};
// 删除用户中心-用户信息
const onRowDel = (row) => {
	ElMessageBox.confirm('此操作将永久删除数据，是否继续?', '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			useUser.deleteUser(row.id).then(() => {
				getTableData();
				ElMessage.success('删除成功');
			});
		})
		.catch(() => {
			ElMessage.error('删除失败');
		});
};
// 重置搜索框
const resetQuery = () => {
	nextTick(() => {
		userSearchRef.value.resetFields();
	});
};
// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.page.size = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.page.current = val;
	getTableData();
};
// 页面加载时
onMounted(() => {
	//getTableData();
	show();
});

//网络请求
import { useWarnApi } from '/@/api/alarm/warn';
const panelApi = useWarnApi();
//火灾信息展示
const show = async () => {
	panelApi.fireShow().then((res) => {
		// for (let i = 0; i < res.length; i++) {
		// 	if (res[i].fields.status) {
		// 		panelStore.setFireShow(res[i]);
		// 	}
		// }
		console.log(res);
		state.tableData.records = res;
		console.log(state.tableData.records);
		//state.tableData.records.values = res;
	});
};
</script>

<style scoped lang="scss">
.system-user-container {
	:deep(.el-card__body) {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;
		.el-table {
			flex: 1;
		}
	}
}
</style>
