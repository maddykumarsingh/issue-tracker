"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";

const statues: { label: String; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Fragment>
      <Toaster />
      <Select.Root
        onValueChange={(status) => {
          const query = status ? `?status=${status}` : "";
          router.push("/issues/list/" + query);
        }}
      >
        <Select.Trigger placeholder="Filter By Status" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Select Status</Select.Label>
            {statues.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Fragment>
  );
};

export default IssueStatusFilter;
