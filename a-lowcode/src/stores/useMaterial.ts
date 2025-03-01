// 组件市场里面所有组件状态的仓库，充当数据仓库
// 业务组件和其他位置修改都是这里
import { defineStore } from 'pinia';
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';

export const useMaterialStore = defineStore('materialStore', {
  state: () => ({
    // 记录所有的业务组件 的状态，也就是那个jsonSchema
    coms: {
      'single-select': defaultStatusMap['single-select'](),
    },
  }),
});
