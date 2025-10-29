//Async / Await Basics
type User = { id: string; name: string };

async function fetchUser(id: string): Promise<User> {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id, name: "Ritik" }), 1000)
  );
}

async function useUser() {
  const user = await fetchUser("1");
  console.log(user); // { id: "1", name: "Ritik" }
}
