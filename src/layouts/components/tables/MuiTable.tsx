import React from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'

function MuiTable(props: any) {
  const { columns, data, options } = props

  const table = useMaterialReactTable({
    columns,
    data,
    ...options
  })
  return <MaterialReactTable table={table} />
}

export default MuiTable
