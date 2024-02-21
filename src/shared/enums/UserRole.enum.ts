export enum UserRole {
  ADMIN = 'Admin',
  TEAM_LEAD = 'Team Lead',
  SALE_EMPLOYEE = 'Sale Employee',
  EMPLOYEE = 'Employee'
}

export const UserRoleValues: UserRole[] = Object.values(UserRole)

export enum SaleEmployeeRole {
  FRONTER = 'Fronter',
  CLOSER = 'Closer'
}

export const SaleEmployeeRoleValues: SaleEmployeeRole[] = Object.values(SaleEmployeeRole)
