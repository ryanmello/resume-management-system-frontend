import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import { IJob } from '../../types/global.typing'
import moment from 'moment'
import "./jobs-grid.scss"

const column: GridColDef[] = [
    {field: "id", headerName: "ID", width: 100},
    {field: "title", headerName: "Title", width: 300},
    {field: "level", headerName: "Level", width: 200},
    {field: "companyName", headerName: "Company Name", width: 200},
    {field: "createdAt", headerName: "Created", width: 200,
        renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
    }
]

interface IJobsGridProps {
    data: IJob[];
}

const JobsGrid = ({ data }: IJobsGridProps) => {
  return (
    <Box sx={{width: "100%", height: 450}} className='jobs-grid'>
        <DataGrid 
            rows={data}
            columns={column}
            getRowId={(row) => row.id}
            rowHeight={50}
        />
    </Box>
  )
}

export default JobsGrid
