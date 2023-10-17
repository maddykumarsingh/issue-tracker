"use client";
import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <Fragment>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            <>
              <TrashIcon></TrashIcon>
              Delete Issue
              {isDeleting && <Spinner />}
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
              <Button onClick={deleteIssue} color="red">
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error Occured</AlertDialog.Title>
          <AlertDialog.Description>
            This Issue could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Fragment>
  );
};

export default DeleteIssueButton;
