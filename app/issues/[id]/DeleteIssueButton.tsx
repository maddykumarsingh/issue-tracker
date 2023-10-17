"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <>
            <TrashIcon></TrashIcon>
            Delete Issue
          </>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Delete ?.</AlertDialog.Title>
        <AlertDialog.Description>
          {" "}
          Are you sure you want to delete the Issue ? Action are not undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              onClick={async () => {
                await axios.delete("/api/issues/" + issueId);
                router.push("/issues");
                router.refresh();
              }}
              color="red"
            >
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;