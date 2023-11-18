import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import { useAnimate, motion } from "framer-motion";

type AreaItemControlProps = {
  top: number | undefined;
};

const AreaItemControl = ({ top }: AreaItemControlProps) => {
  const theme = useTheme();
  const [motionRef, animate] = useAnimate();

  React.useEffect(() => {
    animate(motionRef.current, { top });
  }, [top, motionRef, animate]);

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <motion.div
      ref={motionRef}
      style={{
        position: "absolute",
        top: 0,
        width: "var(--ing-width-areaControl)",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          backgroundColor: theme.palette.common.white,
          height: "fit-content",
          padding: 1,
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton
            size="small"
            onClick={handleAddClick}
            onMouseDown={(e) => e.preventDefault()}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Checkbox
          icon={<VisibilityIcon />}
          checkedIcon={<VisibilityOffIcon />}
          size="small"
          onMouseDown={(e) => e.preventDefault()}
        />
        <Box>
          <IconButton size="small" onMouseDown={(e) => e.preventDefault()}>
            <EditIcon />
          </IconButton>
        </Box>
      </Stack>
    </motion.div>
  );
};

type AreaItemProps = {
  onClick?: (top: number | undefined) => void;
};

const AreaItem = ({ onClick }: AreaItemProps) => {
  const [isHover, setIsHover] = React.useState(false);
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    ref.current?.focus();
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    onClick && onClick(ref.current?.offsetTop);
  };

  return (
    <Paper
      ref={ref}
      tabIndex={0}
      sx={{
        padding: 3,
        position: "relative",
        "&:focus": {
          "&::before": {
            content: '""',
            height: "100%",
            position: "absolute",
            borderRadius: 4,
            left: 0,
            top: 0,
            backgroundColor: theme.palette.primary.main,
            width: 5,
          },
        },
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => handleClick()}
      onBlur={(e) => {
        if (e.relatedTarget === null) {
          e.target.focus();
        }
      }}
    >
      {isHover && (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            cursor: "move",
          }}
        >
          <DragHandleIcon color="primary" />
        </Box>
      )}
      <Stack spacing={2}>
        <Typography variant="h4">簡介</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          laudantium et dolor aut nesciunt, eos repudiandae hic soluta.
          Similique perferendis nulla voluptas qui sapiente odio est inventore
          harum, tenetur aliquam. Odio libero quas veritatis. Repellat, nemo
          enim! Obcaecati dolore repudiandae nihil architecto hic nesciunt
          tempora, velit asperiores temporibus veniam assumenda quae esse odio
          cupiditate! Unde modi ex reiciendis reprehenderit aperiam. Numquam
          rerum doloremque obcaecati sequi iure molestias eveniet quidem ipsa
          quo molestiae beatae sunt voluptas sapiente amet ea officiis maxime
          eum ut consequatur possimus, mollitia aut quaerat perspiciatis minima?
          Quam. Deleniti rerum molestias amet ut magnam vitae, reprehenderit
          unde eos magni est aperiam earum labore cumque voluptatem expedita
          veniam quidem sequi fuga assumenda eveniet accusamus repellendus
          optio! Ratione, vero iste. Ipsum quibusdam enim temporibus ut
          accusamus, suscipit sint, sit ipsa veritatis repellat qui sequi, esse
          rem mollitia? In ipsa expedita praesentium iure ratione, a qui eum
          vitae, suscipit nostrum placeat!
        </Typography>
      </Stack>
    </Paper>
  );
};

export { AreaItemControl };

export default AreaItem;
