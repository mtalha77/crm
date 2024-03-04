import React from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'

function MuiTable(props: any) {
  const { columns, data, options } = props

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    // enableColumnFilters: false,
    // enablePagination: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    ...options
  })
  return <MaterialReactTable table={table} />
}
MuiTable.defaultProps = {
  options: {}
}

export default MuiTable
