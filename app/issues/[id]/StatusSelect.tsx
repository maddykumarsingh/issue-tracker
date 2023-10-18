"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  return (
    <Select.Root
      defaultValue={issue.status ?? undefined}
      onValueChange={(status: Status) => {
        axios.patch("/api/issues/" + issue.id, { status });
      }}
    >
      <Select.Trigger placeholder="Change Status" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Choose Status</Select.Label>
          <Select.Item value={Status.OPEN}>Open</Select.Item>
          <Select.Item value={Status.CLOSED}>Closed</Select.Item>
          <Select.Item value={Status.IN_PROGRESS}>In Progress</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
