import request from '/@/utils/request';

export function useWarnApi() {
	return {
		//火灾信息展示/api/dtction/show
		fireShow() {
			return request({
				url: '/dtction/show',
				method: 'post',
			});
		},
	};
}
