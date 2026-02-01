import { cookies } from "next/headers";
import { env } from "process";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      //   console.log(cookieStore.get("better-auth.session_token"));

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something happen wrong!" } };
    }
  },
};
