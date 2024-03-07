import { Stack } from "@mui/material";
import { RecruitmentItem, RecruitmentNewButton } from "components/Recruitment";

import { useGetRecruitmentsQuery } from "features/api/recruitment/getRecruitments";

export default function Recruitment() {
  const { data: recruitmentData } = useGetRecruitmentsQuery(null);

  return (
    <Stack spacing={1}>
      <RecruitmentNewButton />

      {recruitmentData &&
        recruitmentData.result &&
        recruitmentData.result.map((r) => (
          <RecruitmentItem id={r.Id} key={r.Id} title={r.Name} />
        ))}
    </Stack>
  );
}
