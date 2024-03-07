import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import React from "react";
import { Cell, Order } from "../utils";

interface TableHeadProps<T extends object, K extends keyof T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: K) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: K;
  editable?: boolean;
  rowCount: number;
  cells: Cell<T, K>[];
}

export default function TableHeader<T extends object, K extends keyof T>({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  cells,
  editable,
  onRequestSort,
}: TableHeadProps<T, K>) {
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
          />
        </TableCell>
        {cells.map(({ id, label, getCellLabel, formInput, ...cellProps }) => (
          <TableCell
            {...cellProps}
            key={id.toString()}
            sortDirection={orderBy === id ? order : false}
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : "asc"}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderBy === id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
