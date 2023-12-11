export function mockAuthenticateUser(email, password) {
  let users = { users: [] };
  const usersStringFormat = localStorage.getItem("users");
  if (usersStringFormat) {
    users = JSON.parse(usersStringFormat).users;
  } else {
    return false;
  }

  // Check if there is a user with the provided email and password
  const isAuthenticated = users.some(
    (user) => user.email === email && user.password === password,
  );

  return isAuthenticated;
}

export function mockAddUser(email, password) {
  let users = { users: [] };
  const usersStringFormat = localStorage.getItem("users");

  if (usersStringFormat) {
    users = JSON.parse(usersStringFormat);
  }

  const userExists = users.users.some((user) => user.email === email);
  if (!userExists) {
    // Add the new user to the array
    users.users.push({
      email,
      password,
    });

    const updatedData = JSON.stringify(users);
    localStorage.setItem("users", updatedData);

    return 1;
  }
  return 0;
}

export function mockGetLoggedInUser() {
  return localStorage.getItem("loggedInEmail");
}

export function mockSetLoggedInUser(email) {
  localStorage.setItem("loggedInEmail", email);
}
