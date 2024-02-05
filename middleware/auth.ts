export default function ({ route, redirect }: any) {
  const token: string | null = localStorage.getItem("userToken");

  if (token && route.name === "login") {
    return redirect("/");
  }

  if (!token && route.name !== "login") {
    return redirect("/login");
  }
}
