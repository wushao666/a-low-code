import type { OptionsProps, StatusValue, TextProps } from "@/types";

export function setTextStatus(textProps: TextProps, value: string) {
  textProps.status = value;
}
export function addTextOptions(textOptionsProps: OptionsProps, value: any) {
  console.log('addTextOptions', textOptionsProps.status, value);
  
  textOptionsProps.status.push(value);
}
export function removeTextOptions(textOptionsProps: OptionsProps, index: number) {
  //两个选项时，不能删了
  if(textOptionsProps.status.length === 2) {
    return false
  }
  textOptionsProps.status.splice(index, 1);
  return true
}
export function setPositionStatus(positionProps: OptionsProps, position: number) {
  positionProps.currentStatus = position;
}
export function setSizeStatus(sizeProps: OptionsProps, size: number) {
  sizeProps.currentStatus = size;
}
export function setWeightStatus(weightProps: OptionsProps, weight: number) {
  weightProps.currentStatus = weight;
}
export function setItalicStatus(ItalicProps: OptionsProps, payload: number) {
  ItalicProps.currentStatus = payload;
}
export enum StatusType {
  Position = 'position',
  Size = 'size',
  Weight = 'weight',
  Italic = 'italic',
}

/**
 * 统一更新 currentStatus变量
 * @param type 区分当前状态的类型
 * @param props 
 * @param value 
 */
export function updateCurrentStatus(type: StatusType, props: OptionsProps, value: number) {
  if (value < 0 || value >= props.status.length) {
    throw new Error(`Invalid status value for ${type}`);
  }
  props.currentStatus = value;
}
// Usage example
// updateCurrentStatus(StatusType.Position, positionProps, 1);
// updateStatus(StatusType.Size, sizeProps, 2);
// updateStatus(StatusType.Weight, weightProps, 0);
// updateStatus(StatusType.Italic, italicProps, 1);