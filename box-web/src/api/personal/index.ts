import request from '/@/utils/request';

export const usePersonalApi = () => {
	return {
		//用户管理/api/user/usermanage
		personalUsermanage(username: string, user_type: string) {
			return request({
				url: '/user/usermanage',
				method: 'post',
				data: {
					username,
					user_type,
				},
			});
		},
		//用户信息展示/api/user/usershow
		personalUsershow() {
			return request({
				url: '/user/usershow',
				method: 'post',
			});
		},
	};
};
