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
		//通知/api/talking/notice
		panelNotice() {
			return request({
				url: '/talking/notice',
				method: 'post',
			});
		},
	};
}
