// clerkApi.js

import { Clerk } from '@clerk/nextjs';

const clerk = Clerk();

export async function getUsers() {
  try {
    const userList = await clerk.users.list();
    return userList.map((user) => ({
      username: user.publicMetadata.username,
      email: user.email,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}