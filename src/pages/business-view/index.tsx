import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'

const BusinessView = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [hideNameColumn, setHideNameColumn] = useState<GridColumnVisibilityModel>({ business_name: true })
  const [businesses, setBusinesses] = useState<
    { _id: string; business_name: string; business_email: string; business_number: string; business_hours: string }[]
  >([])

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const res = await axios.get('/api/business/get-all', {
          headers: { authorization: localStorage.getItem('token') }
        })
        setBusinesses(res.data.payload.businesses)
      } catch (error) {
        console.error(error)
      }
    }
    getBusiness()
  }, [])

  const handleViewClick = (row: any) => {
    // Handle view action
    console.log('View clicked for:', row)
  }

  const handleEditClick = (row: any) => {
    // Handle edit action
    console.log('Edit clicked for:', row)
  }

  const columns: GridColDef[] = [
    {
      flex: 1,
      minWidth: 200,
      field: 'business_name',
      headerName: 'Business Name'
    },
    {
      flex: 1,
      minWidth: 200,
      field: 'business_email',
      headerName: 'Business Email',
      renderCell: params => <span>{params.row.business_email}</span>
    },
    {
      flex: 1,
      minWidth: 200,
      field: 'business_number',
      headerName: 'Business Number',
      renderCell: params => <span>{params.row.business_number}</span>
    },
    {
      flex: 1,
      minWidth: 200,
      field: 'business_hours',
      headerName: 'Business Hours',
      renderCell: params => <span>{params.row.business_hours}</span>
    },
    {
      flex: 0.5,
      minWidth: 120,
      field: 'actions',
      headerName: 'Action',
      renderCell: params => (
        <div>
          <IconButton onClick={() => handleViewClick(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
        </div>
      )
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Business Details'
        action={
          <div>
            <Button
              size='medium'
              variant='contained'
              onClick={() => setHideNameColumn({ business_name: !hideNameColumn['business_name'] })}
            >
              Toggle Name Column
            </Button>
          </div>
        }
      />
      <DataGrid
        autoHeight
        rows={businesses}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        columnVisibilityModel={hideNameColumn}
        onPaginationModelChange={setPaginationModel}
        onColumnVisibilityModelChange={newValue => setHideNameColumn(newValue)}
        getRowId={row => row._id} // Assigning business ID to the row
      />
    </Card>
  )
}

export default BusinessView
