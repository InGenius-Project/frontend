export enum UserRole {
  Intern = 0,
  Company = 1,
  Admin = 2,
  InternalUser = 3,
}

export const UserRoleObject = [
  {
    label: '實習生',
    value: UserRole.Intern,
  },
  {
    label: '公司',
    value: UserRole.Company,
  },
  {
    label: '管理員',
    value: UserRole.Admin,
  },
  {
    label: '內部使用者',
    value: UserRole.InternalUser,
  },
];

export const UserRoleLoginData = [
  {
    Id: UserRole.Intern,
    Label: '實習生',
    Email: 'user@gmail.com',
    password: 'testtest',
  },
  {
    Id: UserRole.Company,
    Label: '公司',
    Email: 'c@gmail.com',
    password: 'testtest',
  },
  {
    Id: UserRole.Admin,
    Label: '管理員',
    Email: 'a@gmail.com',
    password: 'testtest',
  },
  {
    Id: UserRole.InternalUser,
    Label: '內部使用者',
    Email: 'i@gmail.com',
    password: 'testtest',
  },
];
