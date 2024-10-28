import request from '/@/utils/request';

/**
 * 用户api接口集合
 */
export function useUserApi() {
	return {
		getUserInfo: () => {
			return request({
				url: '/sso/getInfo',
				method: 'get',
			});
		},
		// 查询用户列表
		getPageList(data: object) {
			return request({
				url: '/user/getPageList',
				method: 'post',
				data: data,
			});
		},
		// 查询用户详细
		getUserById(id: number) {
			return request({
				url: '/user/' + id,
				method: 'get',
			});
		},
		// 新增用户
		createUser(data: object) {
			return request({
				url: '/user/createUser',
				method: 'post',
				data: data,
			});
		},
		updateUser(data: object) {
			return request({
				url: '/user/updateUser',
				method: 'post',
				data: data,
			});
		},
		// 删除用户
		deleteUser(id: number) {
			return request({
				url: '/user/' + id,
				method: 'delete',
			});
		},
		// 用户密码修改
		updatePwd(password: string, oldPassword: string) {
			const data = {
				password,
				oldPassword,
			};
			return request({
				url: '/user/updatePwd',
				method: 'put',
				data: data,
			});
		},

		//POST 火灾检测信息展示POST /api/dtction/show
		show() {
			return request({
				url: '/dtction/show',
				method: 'post',
			});
		},
		//注册/user/register
		register() {
			return request({
				url: '/user/register',
				method: 'post',
				data: {
					username: 'xxp',
					password: '111',
					user_type: 'root',
				},
			});
		},
		//root上传/talking/upload
		upload() {
			return request({
				url: '/talking/upload',
				method: 'post',
				data: { title: '车辆图片', pic: '' },
			});
		},
		//通知 /talking/notice
		notice() {
			return request({
				url: '/talking/notice',
				method: 'post',
			});
		},
		//接受/dtction/accept
		accept() {
			return request({
				url: '/dtction/accept',
				method: 'post',
			});
		},
		//用户管理/user/usermanage
		usermanage() {
			return request({
				url: '/user/usermanage',
				method: 'post',
				data: {
					username: 'say',
					user_type: 'root',
				},
			});
		},
		//用户信息展示/user/usershow
		usershow() {
			return request({
				url: '/dtction/accept',
				method: 'post',
			});
		},
	};
}
