export const loginUser = async (state, dispatch, ifLoginNavigateToSearch) => {
  try {
    const result = await fetch("/api/auth/login", {
      method: "POST",

      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    });
    console.log(result);
    if (result.status === 200) {
      const { foundUser, encodedToken } = await result.json();
      localStorage.setItem("token", encodedToken);
      dispatch({ type: "userPresent", payload: foundUser });
      ifLoginNavigateToSearch();
    }
  } catch (e) {
    console.error(e);
  }
};
