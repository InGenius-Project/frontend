import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useMemo, useRef, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import TableHeader from "./TableHead";
import TableToolabar from "./TableToolbar";
import { Cell, Order, getComparator, stableSort } from "./utils";

interface TableProps<T extends object, K extends keyof T> {
  title?: string;
  form?: React.ReactNode;
  data: readonly T[];
  property: K;
  cells: Cell<T, K>[];
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
  cells,
  title,
  editable = false,
  onEditClick,
  onDelete,
  onSubmit,
}: TableProps<T, K>) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<K>(property);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [editing, setEditing] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { handleSubmit, reset } = useFormContext<T>();
  const newRowButtonRef = useRef<HTMLButtonElement>(null);

  const hotKeyRef = useHotkeys<HTMLDivElement>(
    "ctrl+enter",
    () => newRowButtonRef.current?.click(),
    {
      enableOnFormTags: ["input", "select", "textarea"],
    }
  );

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

  const visibleRows = useMemo(
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
    <div ref={hotKeyRef}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolabar
          numSelected={selected.length}
          title={title}
          onDelete={() => {
            setSelected([]);
            onDelete && onDelete(selected);
          }}
        ></TableToolabar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHeader<T, K>
              editable={editable}
              numSelected={selected.length}
              order={order}
              cells={cells}
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

                    {cells.map(
                      ({ id, formInput, getCellLabel, label, ...props }) => (
                        <TableCell
                          {...props}
                          key={id.toString()}
                          sx={{
                            ...props.sx,
                            cursor: "default",
                          }}
                        >
                          {getCellLabel(row)}
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
                                reset();
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
                  <TableCell colSpan={cells.length + 1} />
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
                    <Tooltip title="新增(Ctrl+Enter)">
                      <IconButton
                        onClick={handleSubmitClick}
                        ref={newRowButtonRef}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  {cells.map(
                    ({ id, label, formInput, getCellLabel, ...props }) => (
                      <TableCell
                        {...props}
                        key={id.toString()}
                        sx={{
                          ...props.sx,
                          cursor: "default",
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
    </div>
  );
}
