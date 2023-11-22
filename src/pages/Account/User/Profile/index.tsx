import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { AreaItem, AreaControl } from "components/Area";
import React from "react";
import ImageFrame from "assets/images/png/imageFrame.png";

import StarsIcon from "@mui/icons-material/Stars";
export default function Profile() {
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);

  const handleClick = (number: number | undefined) => {
    setControlTop(number);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexGrow: 1,
        gap: 1,
      }}
    >
      <Stack
        spacing={1}
        sx={{
          flex: "1 1 auto",
          position: "relative",
        }}
      >
        <AreaItem onClick={handleClick} title="簡介">
          <Typography variant="body1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
            dicta quas iure repellendus eaque inventore tempora ab. Id
            perspiciatis excepturi cupiditate, dolor dolore laborum explicabo
            repellendus quaerat, ipsa reiciendis illum. Similique quidem ullam
            repudiandae dignissimos minus placeat hic quos voluptate nihil quo.
            Magnam quo suscipit nostrum, non facere est voluptatibus odio
            architecto, molestiae fugit optio obcaecati consectetur mollitia
            eveniet nesciunt. Error voluptas perferendis dolorem et ut laborum
            dolorum, voluptatum voluptatibus blanditiis magni sed natus soluta
            obcaecati ex corporis aliquam ad deleniti nemo ipsam itaque eum
            nesciunt. Tempore tenetur necessitatibus minus. Ullam inventore sed
            ab porro qui nam deleniti, quasi numquam excepturi tempora
            architecto nemo tenetur ut quibusdam enim! Pariatur totam illum
            veritatis consectetur praesentium? Ullam consequatur ducimus omnis
            voluptate beatae? Iusto dolor ullam, dignissimos repudiandae odio
            omnis commodi provident ad, aliquid vero, architecto numquam. Dicta
            nemo magnam porro eveniet saepe hic rerum vero, perferendis eaque
            animi, provident aspernatur, fugiat et.
          </Typography>
        </AreaItem>
        <AreaItem onClick={handleClick} title="教育背景">
          <List>
            <ListItem>
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary="國立中正大學" secondary="2021 ~ 2023" />
            </ListItem>
          </List>
        </AreaItem>
        <AreaItem onClick={handleClick} title={"技能"}>
          <List>
            <ListItem>
              <ListItemText primary="ReactJS" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="ASP.NET Web API" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="JQuery" />
            </ListItem>
          </List>
        </AreaItem>
        <AreaItem onClick={handleClick} title={"經驗"}>
          <Stack spacing={2} direction={"row"}>
            <Box sx={{ width: "200px", height: "150px", flexShrink: 0 }}>
              <img
                src={ImageFrame}
                alt="pic"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque beatae accusantium minima reprehenderit, praesentium
              modi mollitia voluptas error voluptates voluptate, quo, saepe ipsa
              nesciunt. Labore distinctio quas corporis aut officiis! Eius
              accusamus explicabo expedita eos fugit eum, vero non quibusdam
              nihil voluptas, dolor magni vel perspiciatis autem i
            </Typography>
          </Stack>
        </AreaItem>
        <AreaItem onClick={handleClick} title={"聯絡方式"}>
          <List>
            <ListItem>
              <Typography variant="body1" width={"5em"}>
                電話
              </Typography>
              <ListItemText primary="09123123123" />
            </ListItem>
            <ListItem>
              <Typography variant="body1" width={"5em"}>
                電子郵件
              </Typography>
              <ListItemText primary="example@email.com" />
            </ListItem>
          </List>
        </AreaItem>
      </Stack>

      <Box
        sx={{
          flexShrink: 0,
          width: "var(--ing-width-areaControl)",
          position: "relative",
        }}
      >
        <AreaControl top={controlTop} />
      </Box>
    </Box>
  );
}
