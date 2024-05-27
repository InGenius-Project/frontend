import { Tooltip, TooltipProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export const EditTooltipWrapper = ({ children, ...props }: PropsWithChildren & Omit<TooltipProps, 'title'>) => (
  <Tooltip {...props} title="編輯">
    {children}
  </Tooltip>
);

export const DeleteTooltipWrapper = ({ children, ...props }: PropsWithChildren & Omit<TooltipProps, 'title'>) => (
  <Tooltip {...props} title="刪除">
    {children}
  </Tooltip>
);

export const AddTooltipWrapper = ({ children, ...props }: PropsWithChildren & Omit<TooltipProps, 'title'>) => (
  <Tooltip {...props} title="新增">
    {children}
  </Tooltip>
);
