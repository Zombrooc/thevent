import { getAuth0AccessToken } from "./getAuth0AccessToken";

export const getAuth0UserDetails = async (userId) => {
  const managementToken = await getAuth0AccessToken();

  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
    {
      // maxBodyLength: Infinity,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${managementToken}`,
      },
    }
  );

  const data = await response.json();

  return data;
};
