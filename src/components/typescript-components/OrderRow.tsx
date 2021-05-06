import React from "react";
import * as ReactRouter from "react-router-dom";
import moment from "moment";

//material ui components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";

//props type
type Props = {
  id: number;
  status: string;
  disabled: boolean;
  trackingNumber: string;
  createdAt: string;
  updatedAt: string;
  handleCancel: (id: number) => void;
};

export function OrderRow({
  id,
  status,
  disabled,
  trackingNumber,
  createdAt,
  updatedAt,
  handleCancel,
}: Props): JSX.Element {
  const history = ReactRouter.useHistory();

  function onClick(id: number) {
    history.push(`/order/${id}`);
  }

  return (
    <TableRow hover key={id}>
      <TableCell component="th" scope="row" onClick={() => onClick(id)}>
        {id}
      </TableCell>
      <TableCell align="right" onClick={() => onClick(id)}>
        {status}
      </TableCell>
      <TableCell align="right" onClick={() => onClick(id)}>
        {trackingNumber ? trackingNumber : "None given yet"}
      </TableCell>
      <TableCell align="right" onClick={() => onClick(id)}>
        {moment(createdAt).format("MMM Do YY, h:mm:ss a")}
      </TableCell>
      <TableCell align="right" onClick={() => onClick(id)}>
        {moment(updatedAt).format("MMM Do YY, h:mm:ss a")}
      </TableCell>
      <TableCell>
        <Button disabled={disabled} onClick={() => handleCancel(id)}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
