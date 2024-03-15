// import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
// import fetch from 'node-fetch';

// export default withApiAuthRequired(async function updateRole(req, res) {
//   try {
//     const { accessToken } = await getAccessToken(req, res, {
//       scopes: ['update:users']
//     });

//     const { userId, newRole } = req.body;

//     const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
//       method: 'PATCH',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         roles: [newRole],
//         app_metadata: { newUser: false }
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// });

"use server";

import axios from "axios";

export async function updateUserRoleAndAcceptRecievePromotions(
  { role, awardsPartnerGroup },
  user
) {
  const { accessToken } = await axios.post(
    `https://dev-8ih75q01s64avpwx.us.auth0.com/oauth/token`,
    {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: "client_credentials",
    }
  );

  //dev-8ih75q01s64avpwx.us.auth0.com/api/v2/

  console.log(accessToken);

  const response = await axios.post(
    `https://dev-8ih75q01s64avpwx.us.auth0.com/api/v2/users/${user.id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roles: [role],
        app_metadata: { newUser: false },
      }),
    }
  );

  console.log(response);

  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  // const data = await response.json();
  // res.status(200).json(data);
}
