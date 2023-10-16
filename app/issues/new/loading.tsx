import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

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
