import request from '/@/utils/request';

/**
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 * interface data <T=any> {
				account:string;
				password:string;
			}
 */
export function useLoginApi() {
	return {
		signIn: (data: object) => {
			return request({
				url: '/user/login',
				method: 'post',
				data: {
					username: data.account,
					password: data.password,
				},
			});
		},
		signOut: () => {
			return request({
				url: '/user/logout',
				method: 'get',
			});
		},
	};
}
