// 组件市场里面所有组件状态的仓库，充当数据仓库
// 业务组件和其他位置修改都是这里
import { defineStore } from 'pinia';
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';
import { 
  addTextOptions, 
  removeTextOptions, 
  setTextStatus,
  // setPositionStatus,
  // setSizeStatus,
  // setWeightStatus,
  // setItalicStatus,
  updateCurrentStatus,
} from './actions';

export const useMaterialStore = defineStore('materialStore', {
  state: () => ({
    //! 因为coms里面会有多个，所以要标识当前是哪个组件
    currentMaterialCom: 'single-select',
    // 记录所有的业务组件 的状态，value就是那个jsonSchema返回的那个对象
    coms: {
      'single-select': defaultStatusMap['single-select'](),
    },
  }),
  actions: {
    setTextStatus,
    addTextOptions,
    removeTextOptions,
    // setPositionStatus,
    // setSizeStatus,
    // setWeightStatus,
    // setItalicStatus,
    updateCurrentStatus,
  }
});
