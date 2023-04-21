import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import "./candidates-grid.scss";
import { ICandidate } from "../../types/global.typing";
import { baseUrl } from "../../constants/url.constants";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Phone", width: 200 },
  { field: "coverLetter", headerName: "CV", width: 200 },
  {
    field: "resumeUrl",
    headerName: "Download",
    width: 150,
    renderCell: (params) => (
      <a href={`${baseUrl}/candidate/download/${params.row.resumeUrl}`} download>
        link
      </a>
    ),
  },
];

interface ICandidateGridProps {
  data: ICandidate[];
}

const CandidatesGrid = ({ data }: ICandidateGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="candidates-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CandidatesGrid;
