import Logo from '@/assets/images/logo/logoNoStyle.svg?react';
import { chatUrl } from '@/assets/utils/urls';
import { MessageChannelItem } from '@/components/Message';
import MessageAIModel from '@/components/Message/MessageAIModel';
import MessageModel from '@/components/Message/MessageModel';
import { useGetChatGroupsQuery } from '@/features/api/chat/getChatGroups';
import { useGetInvitedChatGroupsQuery } from '@/features/api/chat/getInvitedChatGroups';
import { setGroupId } from '@/features/message/messageSlice';
import { useAppDispatch } from '@/features/store';
import { ChatMessage } from '@/types/classes/ChatMessage';
import ChatReceiveMethod from '@/types/enums/ChatReceiveMethod';
import { IChatMessage } from '@/types/interfaces/IChat';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import MailIcon from '@mui/icons-material/Mail';
import { Badge, Box, Button, Divider, IconButton, Paper, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

enum MessagePage {
  ChatGroups,
  InvitedChatGroups,
  AIChat,
}

export type MessageReceiveHandle = {
  onReceiveMessage: (message: IChatMessage) => void;
};

function Message() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { data: chatGroupsData } = useGetChatGroupsQuery(null);
  const { data: invitedChatGroupsData } = useGetInvitedChatGroupsQuery();
  const [pageState, setPageState] = useState<MessagePage>(MessagePage.ChatGroups);
  const [conn, setConn] = useState<HubConnection>();

  const firstRender = useRef(true);
  const dispatch = useAppDispatch();
  const messageModelRef = useRef<MessageReceiveHandle>(null);
  const messageChannelItemRefs = useRef(new Map());

  // connect to chat server
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const connect = async () => {
      const c = new HubConnectionBuilder()
        .withUrl(chatUrl, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
          accessTokenFactory: () => localStorage.getItem('accessToken') || '',
        })
        .build();

      c.on(ChatReceiveMethod.Message, (c: IChatMessage) => {
        messageModelRef.current?.onReceiveMessage(c);
        messageChannelItemRefs.current.get(c.GroupId)?.onReceiveMessage(new ChatMessage(c));
      });

      c.on(ChatReceiveMethod.LastMessage, (c: IChatMessage) => {
        messageChannelItemRefs.current.get(c.GroupId)?.onReceiveMessage(new ChatMessage(c));
      });

      await c.start();
      setConn(c);
    };
    connect();
  }, []);

  const handleClickChannelItem = async (groupId: string) => {
    setPageState(MessagePage.ChatGroups);
    dispatch(setGroupId(groupId));
  };

  const handleClickInvitedChannelItem = async (groupId: string) => {
    dispatch(setGroupId(groupId));
  };

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          direction: 'row',
          height: '100%',
          gap: 2,
        }}
      >
        {/* leftside panel */}
        <Stack
          sx={{
            py: !isMobile ? 2 : 1,
            width: isMobile ? 'fit-content' : '20em',
          }}
          spacing={1}
        >
          <Stack
            direction={'row'}
            sx={{
              justifyContent: 'space-between',
              px: 2,
            }}
          >
            {!isMobile && (
              <Button
                variant={pageState === MessagePage.ChatGroups ? 'contained' : 'outlined'}
                onClick={() => setPageState(MessagePage.ChatGroups)}
              >
                所有
              </Button>
            )}
            <Badge badgeContent={invitedChatGroupsData?.result?.length} color="primary">
              <IconButton onClick={() => setPageState(MessagePage.InvitedChatGroups)}>
                <MailIcon />
              </IconButton>
            </Badge>
          </Stack>

          <Divider />

          {(pageState === MessagePage.ChatGroups || pageState === MessagePage.AIChat) && (
            <>
              <MessageChannelItem
                avatar={
                  <Logo
                    style={{
                      width: '1em',
                      fill: theme.palette.text.primary,
                    }}
                  />
                }
                onClick={() => {
                  setPageState(MessagePage.AIChat);
                  dispatch(setGroupId('ai'));
                }}
                chatGroupInfo={{
                  GroupName: 'InGenius AI',
                  Id: 'ai',
                  IsPrivate: false,
                  Users: [],
                  InvitedUsers: [],
                  CreateTime: '',
                }}
              />
              {chatGroupsData?.result?.map((c, index) => {
                return (
                  <MessageChannelItem
                    onClick={() => handleClickChannelItem(c.Id)}
                    key={c.Id}
                    chatGroupInfo={c}
                    ref={(el) => {
                      if (el) {
                        messageChannelItemRefs.current.set(c.Id, el);
                      }
                    }}
                  />
                );
              })}
            </>
          )}

          {pageState === MessagePage.InvitedChatGroups && (
            <>
              {invitedChatGroupsData?.result?.map((c) => {
                return (
                  <MessageChannelItem
                    onClick={() => handleClickInvitedChannelItem(c.Id)}
                    key={c.Id}
                    chatGroupInfo={c}
                  />
                );
              })}
            </>
          )}
        </Stack>

        {/* Right panel */}
        <Box
          sx={{
            flex: '1 1 auto',
          }}
        >
          {pageState === MessagePage.AIChat ? <MessageAIModel /> : <MessageModel conn={conn} ref={messageModelRef} />}
        </Box>
      </Paper>
    </>
  );
}

export default Message;
