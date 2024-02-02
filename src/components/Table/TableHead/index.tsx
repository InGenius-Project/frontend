import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { HeadCellType, Order } from "../utils";

interface EnhancedTableProps<T extends object, K extends keyof T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: K) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: K;
  editable?: boolean;
  rowCount: number;
  headCells: HeadCell<K>[];
}

export interface HeadCell<K> {
  id: K;
  label: string;
  type: HeadCellType;
  disablePadding?: boolean;
  formInput?: React.ReactNode;
  width?: string;
  hidden?: boolean;
}

export default function EnhancedTableHead<T extends object, K extends keyof T>(
  props: EnhancedTableProps<T, K>
) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    headCells,
    editable,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: K) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells
          .filter((c) => !c.hidden)
          .map((c) => (
            <TableCell
              key={c.id.toString()}
              align={c.type === HeadCellType.Number ? "right" : "left"}
              padding={c.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === c.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === c.id}
                direction={orderBy === c.id ? order : "asc"}
                onClick={createSortHandler(c.id)}
              >
                {c.label}
                {orderBy === c.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {editable && <TableCell>選項</TableCell>}
      </TableRow>
    </TableHead>
  );
}
