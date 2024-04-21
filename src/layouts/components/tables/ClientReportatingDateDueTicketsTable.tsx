import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { mapFormPageRoutes } from 'src/constants'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import MuiTable from './MuiTable'
import DueDateTicketsColumns from './columns/DueDateTicketsColumns'

function ClientReportatingDateDueTicketsTable({ data, isLoading }: any) {
  const { user } = useAuth()
  const router = useRouter()

  const { status } = router.query

  const handleTicketEdit = (depart_name: Department, ticketId: string) => {
    const page: string = mapFormPageRoutes[depart_name]

    router.push({
      pathname: page,
      query: { ticketId }
    })
  }

  const ViewPaymentHistory = (ticketId: string) => {
    router.push({
      pathname: '/view-payment-history',
      query: { ticketId }
    })
  }

  const columns: any = useMemo(() => DueDateTicketsColumns(user, handleTicketEdit, ViewPaymentHistory), [data])

  return (
    <>
      <MuiTable
        data={data}
        columns={columns}
        options={{
          enableColumnFilters: false,
          state: {
            isLoading: isLoading
          },
          initialState: {
            density: 'compact',
            showGlobalFilter: true,

            columnVisibility: {
              payment_history: !(
                user?.role === UserRole.EMPLOYEE ||
                user?.role === UserRole.TEAM_LEAD ||
                user?.role === UserRole.SALE_EMPLOYEE
              ),
              assignee_depart_name: !(user?.role === UserRole.EMPLOYEE || user?.role === UserRole.TEAM_LEAD)
            },
            columnFilters: [
              {
                id: 'status',
                value: status ? status : ''
              }
            ]
          }
        }}
      />
    </>
  )
}

export default ClientReportatingDateDueTicketsTable
