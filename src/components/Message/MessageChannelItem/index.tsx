import { IConnection } from '@/types/interfaces/IUser';
import { Avatar, ButtonBase, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

type MessageChannelItemProps = {
  avatar?: React.ReactNode;
  userName: string;
  message: string;
  connection?: IConnection;
  onClick?: (c: IConnection | undefined) => void;
};

function MessageChannelItem({ avatar, userName, message, connection, onClick }: MessageChannelItemProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <ButtonBase
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        gap: 2,
        overflow: 'hidden',
        textAlign: 'start',
        width: isMobile ? 'fit-content' : undefined,
      }}
      component="button"
      onClick={() => onClick?.(connection)}
    >
      <Avatar>{avatar}</Avatar>
      {!isMobile && (
        <>
          <Stack spacing={1} sx={{ flex: '1 1 auto', justifyContent: 'flex-start' }}>
            <Typography variant={'body1'}>{userName}</Typography>
            <Typography
              variant="caption"
              sx={{
                width: '10em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {message}
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
            1 分鐘前
          </Typography>
        </>
      )}
    </ButtonBase>
  );
}

export default MessageChannelItem;
