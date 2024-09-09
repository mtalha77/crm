export enum UserRole {
  ADMIN = 'Admin',
  TEAM_LEAD = 'Team Lead',
  SALE_MANAGER = 'Sales Manager',
  SALE_EMPLOYEE = 'Sales Employee',
  EMPLOYEE = 'Employee',
  IT_PERSON = 'It Person',
}

export const UserRoleValues: UserRole[] = Object.values(UserRole)

export enum SaleEmployeeRole {
  FRONTER = 'Fronter',
  CLOSER = 'Closer'
}

export const SaleEmployeeRoleValues: SaleEmployeeRole[] = Object.values(SaleEmployeeRole)
