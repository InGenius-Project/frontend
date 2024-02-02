import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, Tab, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import AddIcon from "@mui/icons-material/Add";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import EnhancedTableHead, { HeadCell } from "./TableHead";
import EnhancedTableToolbar from "./TableToolbar";
import { HeadCellType, Order, getComparator, stableSort } from "./utils";
import { SubmitHandler, useFormContext } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";
import { useHotkeys } from "react-hotkeys-hook";

interface TableProps<T extends object, K extends keyof T> {
  title?: string;
  form?: React.ReactNode;
  data: readonly T[];
  property: K;
  headCells: HeadCell<K>[];
  editable?: boolean;
  onEditClick?: (row: T) => void;
  onSubmit?: SubmitHandler<T>;
  onDelete?: (ids: readonly string[]) => void;
}

export default function EnhancedTable<
  T extends object & { Id: string },
  K extends keyof T,
>({
  data,
  property,
  headCells,
  title,
  form,
  editable = false,
  onEditClick,
  onDelete,
  onSubmit,
}: TableProps<T, K>) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<K>(property);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [editing, setEditing] = React.useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { handleSubmit } = useFormContext<T>();
  const newRowButtonRef = React.useRef<HTMLButtonElement>(null);

  useHotkeys("ctrl+enter", () => newRowButtonRef.current?.click(), {
    enableOnFormTags: ["input", "select", "textarea"],
  });

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: K) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.Id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (row: T) => {
    setEditing(row.Id);
    onEditClick && onEditClick(row);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort<T>(data, getComparator<T, K>(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  );
  const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    setEditing("");
    onSubmit && handleSubmit(onSubmit)(event);
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        title={title}
        onDelete={() => {
          setSelected([]);
          onDelete && onDelete(selected);
        }}
      ></EnhancedTableToolbar>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead<T, K>
            editable={editable}
            numSelected={selected.length}
            order={order}
            headCells={headCells}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.Id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.Id}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                      onClick={(event) => handleClick(event, row.Id)}
                    />
                  </TableCell>

                  {headCells.map(
                    ({ id, type, label, formInput, hidden, width }) => (
                      <TableCell
                        key={id.toString()}
                        align={type === HeadCellType.Number ? "right" : "left"}
                        sx={{
                          width,
                          cursor: "default",
                          display: hidden ? "none" : "table-cell",
                        }}
                      >
                        {editable && editing === row.Id ? (
                          <>{formInput}</>
                        ) : (
                          <>
                            {type === HeadCellType.Text ||
                            type === HeadCellType.Number ? (
                              <Typography>{row[id] as string}</Typography>
                            ) : type === HeadCellType.Color ? (
                              <Box
                                sx={{
                                  width,
                                  position: "relative",
                                  paddingLeft: "1.5em",
                                  "::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: "0.5em",
                                    left: 0,
                                    width: "1em",
                                    height: "1em",
                                    backgroundColor: row[id] as string,
                                  },
                                }}
                              >
                                <Typography>{row[id] as string}</Typography>
                              </Box>
                            ) : null}
                          </>
                        )}
                      </TableCell>
                    )
                  )}
                  {editable && (
                    <TableCell padding="none" sx={{ width: "10%" }}>
                      {editing === row.Id ? (
                        <Stack spacing={1} direction={"row"}>
                          <IconButton onClick={handleSubmitClick}>
                            <CheckIcon />
                          </IconButton>
                          <IconButton
                            onClick={(event) => {
                              event.stopPropagation();
                              setEditing("");
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                        </Stack>
                      ) : (
                        <IconButton
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            handleEditClick(row);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={headCells.length + 1} />
              </TableRow>
            )}

            {/* New Row */}
            {editable && (
              <TableRow
                sx={{
                  display: editing === "" ? "table-row" : "none",
                }}
              >
                <TableCell padding="checkbox">
                  <Tooltip title="新增標籤類型(Ctrl+Enter)">
                    <IconButton
                      onClick={handleSubmitClick}
                      ref={newRowButtonRef}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                {headCells.map(
                  ({ id, type, label, formInput, hidden, width }) => (
                    <TableCell
                      key={id.toString()}
                      align={type === HeadCellType.Number ? "right" : "left"}
                      sx={{
                        width,
                        cursor: "default",
                        display: hidden ? "none" : "table-cell",
                      }}
                    >
                      {formInput}
                    </TableCell>
                  )
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
