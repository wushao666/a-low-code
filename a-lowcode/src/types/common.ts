import type { defineComponent } from "vue";
import type { OptionsStatus } from "./configStatus";

// 导出vue组件类型
export type VueComType = ReturnType<typeof defineComponent>;

export interface IComStatus {
  type: VueComType;
  name: string;
  id: string;
  status: OptionsStatus
}