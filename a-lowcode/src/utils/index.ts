import type { OptionsProps, TextProps } from "@/types";

export function getPropsTextStatus(props: TextProps) {
  return props.status;
}

export function getPropsStatus(props: OptionsProps) {
  return props.status;
}

export function getPropsOptionStatus(props: OptionsProps): string {
  const status = props.status[props.currentStatus];
  return typeof status === 'string' ? status : '16';
}
export function getPropsCurrentStatus(props: OptionsProps) {
  return props.currentStatus;
}