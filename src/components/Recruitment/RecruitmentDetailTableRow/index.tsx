import UserAvatar from '@/components/UserAvatar';
import { IResume } from '@/types/interfaces/IResume';
import { Chip, Stack, TableCell, TableRow, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import getTimeDiffer from './../../../assets/utils/getTimeDiffer';

type RecruitmentDetailTableRowProps = {
  resume: IResume;
};

function RecruitmentDetailTableRow({ resume }: RecruitmentDetailTableRowProps) {
  const location = useLocation();

  return (
    <TableRow>
      <TableCell>
        <Stack direction={'row'} spacing={1}>
          <UserAvatar uri={resume.User.Avatar?.Uri} alt={resume.User.Username} size={'1.5em'} />
          <Typography variant="body1">{resume.User.Username}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack spacing={1} direction={'row'}>
          <Link
            to={`Resume/${resume.Id}`}
            component={RouterLink}
            state={{
              from: location,
            }}
          >
            <Typography variant="caption">{resume.Title}</Typography>
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="right">
        <Typography variant="caption">{getTimeDiffer(resume.ModifiedAt)}</Typography>
      </TableCell>
    </TableRow>
  );
}

export function RecruitmentDetailTableEmptyRow() {
  return (
    <TableRow>
      <TableCell colSpan={3}>
        <Typography variant="body1">沒有相關履歷</Typography>
      </TableCell>
    </TableRow>
  );
}

export function RecruitmentDetailRelativeTableRow({ resume }: RecruitmentDetailTableRowProps) {
  const location = useLocation();

  return (
    <TableRow>
      <TableCell>
        <Stack direction={'row'} spacing={1}>
          <UserAvatar uri={resume.User.Avatar?.Uri} alt={resume.User.Username} size={'1.5em'} />
          <Typography variant="body1">{resume.User.Username}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack spacing={1} direction={'row'}>
          <Link
            to={`Resume/${resume.Id}`}
            component={RouterLink}
            state={{
              from: location,
            }}
          >
            <Typography variant="caption">{resume.Title}</Typography>
          </Link>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack spacing={1} direction={'row'}>
          {resume.Keywords?.slice(0, 4).map((tag, index) => (
            <Typography key={`${tag.Id}-${index}`} variant="caption">
              <Chip label={tag.Id} />
            </Typography>
          ))}
        </Stack>
      </TableCell>

      <TableCell align="right">
        <Typography variant="caption">{getTimeDiffer(resume.ModifiedAt)}</Typography>
      </TableCell>
    </TableRow>
  );
}

export function RecruitmentDetailRelativeTableEmptyRow() {
  return (
    <TableRow>
      <TableCell colSpan={4}>
        <Typography variant="body1">沒有相關履歷</Typography>
      </TableCell>
    </TableRow>
  );
}

export default RecruitmentDetailTableRow;
