// This file is used to extend the default NextAuth session type with our custom user properties
// we import the default NextAuth types to extend them
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
