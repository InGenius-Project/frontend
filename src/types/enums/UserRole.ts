export enum UserRole {
  Intern,
  Company,
  Admin,
  InternalUser,
}

export const UserRoleObject = [
  {
    label: "實習生",
    value: UserRole.Intern,
  },
  {
    label: "公司",
    value: UserRole.Company,
  },
  {
    label: "管理員",
    value: UserRole.Admin,
  },
  {
    label: "內部使用者",
    value: UserRole.InternalUser,
  },
];
