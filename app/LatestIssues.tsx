import prisma from "@/prisma/client";
import { Table, Flex, Text, Avatar, Card, Heading } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="3">
        Latest Issue
      </Heading>
      <Table.Root variant="surface">
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex direction="row" justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Text> {issue.title}</Text>
                    <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                  </Flex>
                  {issue.assignedUser && (
                    <Avatar
                      src={issue.assignedUser.image!}
                      fallback="?"
                      radius="full"
                      size="2"
                    ></Avatar>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
