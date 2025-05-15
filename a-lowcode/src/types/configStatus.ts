import type { VueComType } from "./common";

//! 描述对象的结构，用 interface 定义
export interface BaseProps {
  id: string;
  name: string;
  editCom: VueComType;
  isShow: boolean;
  // [key: string]: any; // 允许其他属性
};

// 三种 小status 的细分属性
export type StatusStringArr = string[]
export type StatusValueArr = Array<{
  // [key: string]: string;
  value: string;
  status: string;
}>
export type StatusPicTitleDescArr = Array<{
  picTitle: string;
  picDesc: string;
  value: string;
}>

export type StatusValue = StatusStringArr |StatusValueArr | StatusPicTitleDescArr;

export interface TextProps extends BaseProps {
  status: string; // 选项的状态值
}
export interface OptionsProps extends BaseProps {
  status: StatusValue; // 选项的状态值
  currentStatus: number // 当前选中的选项
}

// 描述每个配置项的 status 大属性
export interface BaseStatus {
  title: TextProps;
  desc: TextProps;
  position: OptionsProps;
  titleSize: OptionsProps;
  descSize: OptionsProps;
  titleWeight: OptionsProps;
  descWeight: OptionsProps;
  titleItalic: OptionsProps;
  descItalic: OptionsProps;
  titleColor: TextProps;
  descColor: TextProps;
}

// 单独描述有 options 属性的业务组件
export interface OptionsStatus extends BaseStatus{
  options: OptionsProps;
}