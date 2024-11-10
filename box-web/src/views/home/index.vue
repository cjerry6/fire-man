<template>
	<div class="layout-pd">
		<!-- 中部LOGO -->
		<el-row justify="center">
			<el-col :span="8"></el-col>
			<el-col :span="8" justify="center">
				<el-image style="height: 300px; display: block; margin: auto" :src="state.url" fit="contain" />
			</el-col>
			<el-col :span="8"></el-col>
		</el-row>
		<button @click="notice()">我是一个测试按钮</button>
		<!-- 底部搜索框 -->
		<el-row justify="center">
			<el-col :span="8"></el-col>
			<el-col :span="8" style="height: 300px; display: block; margin: auto">
				<!-- 搜索框 -->
				<el-input v-model="state.inputSearch" style="max-width: 600px" placeholder="搜索最近火灾状况" class="input-with-select" size="large">
					<template #append>
						<el-button :icon="Search" />
					</template>
				</el-input>
				<!-- 上传文件 -->
				<el-upload class="upload-demo" list-type="picture" method="post" name="pic" action="/api/talking/upload" :show-preview="false" multiple drag>
					<el-icon class="el-icon--upload"><upload-filled /></el-icon>
					<div class="el-upload__text">拖动文件上传或 <em>点击文件上传</em></div>
					<template #tip>
						<div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
					</template>
				</el-upload>
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
</style>
