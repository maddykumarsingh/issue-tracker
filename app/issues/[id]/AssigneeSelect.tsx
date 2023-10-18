"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger placeholder="Assign ...." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="orange">Nitin Singh</Select.Item>
          <Select.Item value="apple">Subrat Chowdhary</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
