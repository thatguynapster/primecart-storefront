"use client";

import { InputHTMLAttributes } from "react";
import { camelCase } from "lodash";

import { ILocation, Places } from "./Map";
import { Input } from "./ui/input";

export interface PlaceProps
  extends Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "value">> {
  setFieldValue?: any;
  setFieldTouched?: any;
  name: string;
  value: ILocation;
  country?: string[];
}

export function Place({
  name,
  value,
  country,
  placeholder = "",
  setFieldValue,
  setFieldTouched,
  ...props
}: PlaceProps) {
  return (
    <Places
      country={country}
      id={camelCase(name)}
      onChange={(value: any) => {
        console.log(value)
        setFieldValue?.(name, value);
        setTimeout(() => setFieldTouched?.(name, true), 500);
      }}
    >
      {/* <Input
        withFormik={false}
        placeholder={placeholder}
        defaultValue={value?.address || ""}
        {...props}
      /> */}
      <Input
        placeholder={placeholder}
        defaultValue={value?.address || ""}
        {...props} />
    </Places>
  );
}
