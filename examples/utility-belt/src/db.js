//simulate the service layer
export const db = {
  findByUserId: async (userId) => {
    return {
      id: userId,
      name: 'John Doe',
      email: '4x2Xc@example.com',
    };
  },
};

export const getUserById = async (userId) => {
  try {
    const user = await db.findByUserId(userId);
    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }
    return user;
  } catch (error) {
    throw new Error(`Database error. Detail: ${error.message}`);
  }
};
