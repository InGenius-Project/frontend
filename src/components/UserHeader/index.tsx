import { Stack, Breadcrumbs, Checkbox, Link } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Cycle } from "framer-motion";
import { UIMatch, useMatches } from "react-router-dom";
import { AgnosticBaseRouteObject } from "@remix-run/router/dist/utils";
import { Link as RouterLink } from "react-router-dom";

type UserHeaderProps = {
  toggle: boolean;
  onToggle: Cycle;
};

export default function UserHeader({ toggle, onToggle }: UserHeaderProps) {
  const matches = useMatches() as UIMatch<
    unknown,
    AgnosticBaseRouteObject["handle"]
  >[];

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => ({
      label: match.handle?.crumb,
      pathname: match.pathname,
    }));

  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        height: "var(--ing-height-user-header)",
      }}
      id={"userHeader"}
    >
      <Checkbox
        checked={toggle}
        icon={<KeyboardDoubleArrowRightIcon />}
        checkedIcon={<KeyboardDoubleArrowLeftIcon />}
        onChange={() => onToggle()}
        sx={{
          marginRight: 1,
        }}
      />
      <Breadcrumbs>
        {crumbs.map((crumb, index) => (
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={crumb.pathname}
            key={`userHeader-breadcrumb-${index}`}
          >
            {crumb.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
  );
}
