import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
});

// GOOGLE_ID=515821952934-2v3qq6nqkhluva20jib3hmuo9cvad2lh.apps.googleusercontent.com
// GOOGLE_SECRET=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
