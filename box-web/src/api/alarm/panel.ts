import request from '/@/utils/request';

export function usePanelApi() {
	return {
		//接受/dtction/accept
		panelAccept() {
			return request({
				url: '/dtction/accept',
				method: 'post',
			});
		},
	};
}
