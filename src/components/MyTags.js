import React from "react";
import { MultiSelect } from "primereact/multiselect";

export const allTags = [
  { name: "Tag1", code: "T1" },
  { name: "Tag2", code: "T2" },
  { name: "Tag3", code: "T3" },
  { name: "Tag4", code: "T4" },
];

export default function MyTags({ value, onChange }) {
  return (
    <MultiSelect
      value={value}
      onChange={onChange}
      options={allTags}
      optionLabel="name"
      display="chip"
      placeholder="Select Tags"
      className="w-full md:w-20rem"
    />
  );
}
