import CommunityEmpty from '@/components/Community/CommunityEmpty';
import CommunityItem from '@/components/Community/CommunityItem';
import { useGetPublicChatGroupQuery } from '@/features/api/chat/getPublicChatGroups';
import { selectConn } from '@/features/message/messageSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import ChatReceiveMethod from '@/types/enums/ChatReceiveMethod';
import { IChatMessage } from '@/types/interfaces/IChat';
import { Box, Button, Divider, Paper, Stack, Tab, Tabs } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Stack spacing={1} role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Stack>
  );
}

function Community() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const { data: publicChatGroupsData } = useGetPublicChatGroupQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickCreateHub = () => {
    navigate('Create');
  };

  return (
    <>
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="所有" />
        </Tabs>
        <Box>
          <Button onClick={handleClickCreateHub}>建立話題</Button>
        </Box>
      </Stack>
      <Paper sx={{}}>
        <TabPanel value={value} index={0}>
          {publicChatGroupsData?.result?.map((group) => (
            <>
              <CommunityItem key={group.Id} owner={group.Owner} chatGroup={group} />
              <Divider />
            </>
          ))}
          <CommunityEmpty />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Paper>
    </>
  );
}

export default Community;
