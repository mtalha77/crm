export enum UserRole {
  ADMIN = 'ADMIN',
  TEAM_LEAD = 'TEAM LEAD',
  SALE_EMPLOYEE = 'SALE EMPLOYEE',
  EMPLOYEE = 'EMPLOYEE'
}

export const UserRoleValues: UserRole[] = Object.values(UserRole)
