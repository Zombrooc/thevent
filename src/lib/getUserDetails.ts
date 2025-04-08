// import { getAuth0AccessToken } from "./getAuth0AccessToken";
import { clerkClient } from "@clerk/nextjs/server";

export const getUserDetails = async (userId) => {
  const userData = await clerkClient.users.getUser(userId);

  const user = {
    id: userData.id,
    name: `${userData.firstName} ${userData.lastName}`,
    email: userData.emailAddresses[0].emailAddress,
    imageUrl: userData.imageUrl,
  };

  return user;
};
