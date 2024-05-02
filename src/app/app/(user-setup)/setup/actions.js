"use server";

import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";

import { api } from "@/lib/utils";

import { getAuth0AccessToken } from "@/lib/getAuth0AccessToken";
export async function updateUserRoleAndAcceptRecievePromotions(
  { role, awardsPartnerGroup },
  session_token,
  state
) {
  const access_token = await getAuth0AccessToken();

  const { payload } = jwt.decode(session_token, { complete: true });

  const userID = payload.sub;

  const continue_uri = payload.continue_uri;

  try {
    const { data } = await api.get(`/roles?name_filter=${role}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
        "cache-control": "no-cache",
      },
    });

    const roleID = data[0].id;

    const updatedUser = await api.post(
      `/users/${userID}/roles`,
      {
        roles: [`${roleID}`],
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "cache-control": "no-cache",
        },
      }
    );

    if (updatedUser.status !== 204) {
      throw new Error(
        `Failed to update role, status code: ${updatedUser.status}`
      );
    }

    const updatedSessionToken = jwt.sign(
      {
        ...payload,
        awardsPartnerGroup,
        newUser: false,
        state,
      },
      process.env.AUTH0_SECRET
    );

    const redirectUrl = `${continue_uri}?session_token=${updatedSessionToken}&state=${state}`;
    return { success: true, redirectUrl };
  } catch (error) {
    console.error("Error updating user role or metadata:", error.message);
    return { success: false, message: error.message };
  }
}
