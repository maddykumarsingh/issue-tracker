import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssueLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <form className="space-y-3">
        <Skeleton />
        <Skeleton height={"20rem"} />

        <Skeleton />
      </form>
    </Box>
  );
};

export default NewIssueLoadingPage;
