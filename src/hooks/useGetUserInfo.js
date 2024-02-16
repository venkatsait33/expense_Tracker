export const useGetUserInfo = () => {
  const { name, profilePhoto, userID, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );
  return {
    userID,
    name,
    profilePhoto,
    isAuth,
  };
};
