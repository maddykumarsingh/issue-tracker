import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Card, Flex, Grid, Heading, Text, Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import options from "@/app/auth/options";
import AssigneeSelect from "./AssigneeSelect";
import StatusSelect from "./StatusSelect";
import exp from "constants";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(options);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex gap={"4"} direction="column">
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue}></StatusSelect>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: issue?.title,
    description: issue?.description,
  };
}
