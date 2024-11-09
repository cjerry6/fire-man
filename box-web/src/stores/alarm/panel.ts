import { defineStore } from 'pinia';

export const usePanelStore = defineStore('panel', {
	state: () => ({
		fireShow: [],
	}),
	actions: {
		async setFireShow(data: any) {
			// console.log(data);
			// for (let i = 0; i < data.lenth; i++) {
			// 	if (data[i].fields.status) {
			// 		console.log(data[i]);
			// 		// this.fireShow.push(data[i]);
			// 	}
			// }

			this.fireShow = data;
			console.log(this.fireShow);
		},
		deleteFireShow(id: number) {
			this.fireShow.splice(id, 1);
		},
	},
});
