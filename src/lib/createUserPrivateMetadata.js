" use server";

export const createUserPrivateMetadata = async (userId, stripeId) => {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        stripeCustumerId: stripeId,
      },
    });
    return { success: true };
  } catch (e) {
    throw new Error(e.message);
  }
};
