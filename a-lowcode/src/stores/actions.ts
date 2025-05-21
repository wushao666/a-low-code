import type { TextProps } from "@/types";

export function setTextStatus(textProps: TextProps, value: string) {
  textProps.status = value;
}