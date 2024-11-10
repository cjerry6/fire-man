<template>
	<div class="layout-pd">
		<!-- 中部LOGO -->
		<el-row justify="center">
			<el-col :span="8"></el-col>
			<el-col :span="8" justify="center">
				<el-image style="height: 300px; display: block; margin: 0;" :src="state.url" fit="contain" />
			</el-col>
			<el-col :span="8"></el-col>
		</el-row>
		<!-- 底部操作区 -->
		<el-row justify="center" class="操作区">
			<el-col :span="8"></el-col>
			<el-col :span="8">
				<div class="操作区内">
					<!-- 一键通知按钮 -->
					<el-button class="notice-button" @click="notice()">一键通知到相应用户</el-button>
					<!-- 上传文件 -->
					<el-upload class="upload-demo" list-type="picture" method="post" name="pic"
						action="/api/talking/upload" :show-preview="false" multiple drag>
						<el-icon class="el-icon--upload"><upload-filled /></el-icon>
						<div class="el-upload__text">拖动文件上传或 <em>点击文件上传</em></div>
					</el-upload>
				</div>
			</el-col>
			<el-col :span="8"></el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="home">
import { Search } from '@element-plus/icons-vue';
import { reactive, onMounted } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';

// 定义变量内容
const state = reactive({
	inputSearch: '',
	url: 'https://pic.imgdb.cn/item/671f90ded29ded1a8c4aa826.png',
});

// 页面加载时
onMounted(() => {});
//网络请求
import { usePanelApi } from '/@/api/alarm/panel';
const panelApi = usePanelApi();
//通知
const notice = async () => {
	panelApi.panelNotice().then((res) => {
		console.log('1', res);
	});
};
</script>
<style scoped lang="scss">
.el-row {
	margin-top: 4em;
}

.el-row:last-child {
	margin-bottom: 0;
}

.el-col {
	border-radius: 4px;
}
.layout-pd {
	padding: 20px;
}

.操作区 {
	height: 300px;
	/* 确保操作区有足够的高度 */
	display: flex;
	align-items: center;
	/* 垂直居中 */
	justify-content: center;
	/* 水平居中 */
}

.notice-button {
	margin-bottom: 20px;
	/* 为按钮和上传组件之间添加间距 */
	padding: 10px 20px;
	/* 调整按钮内边距 */
	font-size: 16px;
	/* 调整按钮字体大小 */
	color: #fff;
	/* 按钮文字颜色 */
	background-color: #409eff;
	/* 按钮背景颜色 */
	border-color: #409eff;
	/* 按钮边框颜色 */
	border-radius: 4px;
	/* 按钮边框圆角 */
}

.notice-button:hover {
	background-color: #66b1ff;
	/* 按钮悬浮时的背景颜色 */
	border-color: #66b1ff;
	/* 按钮悬浮时的边框颜色 */
}

.upload-demo {
	width: 100%;
	/* 上传组件宽度 */
}

.el-upload__text {
	margin-top: 20px;
	/* 上传文本与图标之间的间距 */
}
</style>
