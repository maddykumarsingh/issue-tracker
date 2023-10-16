import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="3" my="2">
        <Skeleton width={"5rem"} />
        <Skeleton width={"5rem"} />
      </Flex>
      <Card className="prose">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default IssueDetailLoadingPage;
