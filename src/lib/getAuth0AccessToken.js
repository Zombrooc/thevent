"use server";

import { api } from "@/lib/utils";
import { cookies } from "next/headers";
import { prisma } from "./database";

export const getAuth0AccessToken = async () => {
  const hasManagementTokenOnCookies = cookies().has("tokenId");

  let createNewOne = false;

  if (hasManagementTokenOnCookies) {
    const managementToken = await prisma.managementToken.findUnique({
      where: {
        id: cookies().get("tokenId").value,
      },
    });

    if (managementToken.expiration > Date.now()) {
      return managementToken.managementToken;
    }

    createNewOne = true;
  } else {
    createNewOne = true;
  }

  if (createNewOne) {
    var options = {
      method: "POST",
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
      }),
    };

    const { data } = await api.request(options);

    const dbManagementToken = await prisma.managementToken.create({
      data: {
        managementToken: data.access_token,
        expiration: new Date(new Date().getTime() + 86400),
      },
    });

    cookies().set("tokenId", dbManagementToken.id, {
      secure: true,
      expires: dbManagementToken.expiration,
    });

    return dbManagementToken.managementToken;
  }
};
