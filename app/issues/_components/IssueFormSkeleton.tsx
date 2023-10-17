import { Skeleton } from "@/app/components";
import { Box, Button } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <form className="space-y-3">
        <Skeleton height={"2rem"} />
        <Skeleton height={"25rem"} />

        <Button>
          <Skeleton width={"5rem"}></Skeleton>
        </Button>
      </form>
    </Box>
  );
};

export default IssueFormSkeleton;
