import { User } from 'firebase/auth';

export const getRecipientEmail = (
  users: [string, string],
  userLoggedIn: User | null | undefined
) => {
  return users?.filter(
    (userToFilter) => userToFilter !== userLoggedIn?.email
  )[0];
};
