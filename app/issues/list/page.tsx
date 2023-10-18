import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import IssueActions from "../IssueActions";
import IssueTable from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;

  const where = { status };
  const pageSize = 10;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions></IssueActions>
      <IssueTable issues={issues} searchParams={searchParams} />
      <Box my="3">
        <Pagination
          itemCount={issuesCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Box>
    </div>
  );
};

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View a Summary of the Issue Tracker",
};

export default IssuePage;
