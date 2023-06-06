export const SignupUser = async (state, signInUser) => {
  try {
    const result = await fetch("/api/auth/signup", {
      method: "POST",

      body: JSON.stringify({
        email: state.email,
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
      }),
    });

    if (result.status === 201) {
      signInUser();
    }
  } catch (e) {
    console.error(e);
  }
};
