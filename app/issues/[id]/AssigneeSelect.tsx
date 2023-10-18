"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60 seconds
    retry: 3, // retry for request for three times.
  });

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUser();

  if (isLoading) return <Skeleton></Skeleton>;

  if (error) return null;

  const assignToUser = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, { assignedTo: userId })
      .catch((error) => toast.error("Changes could not be saved."));
  };

  return (
    <Fragment>
      <Toaster />
      <Select.Root
        defaultValue={issue.assignedTo ?? undefined}
        onValueChange={assignToUser}
      >
        <Select.Trigger placeholder="Assign.." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Fragment>
  );
};

export default AssigneeSelect;
