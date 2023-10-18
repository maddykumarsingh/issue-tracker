import { Fragment } from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Fragment>
      <LatestIssues></LatestIssues>
      <IssueSummary
        open={open}
        inProgress={inProgress}
        closed={closed}
      ></IssueSummary>
      <IssueChart
        open={open}
        inProgress={inProgress}
        closed={closed}
      ></IssueChart>
    </Fragment>
  );
}
