"use client";
import { Auth0Provider } from "@auth0/auth0-react";

export default function AuthProvider({ children }) {
 
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

  console.log('Auth0 config:', { domain, clientId, audience }); // Debugging

  const redirectUri =
    typeof window !== "undefined" ? window.location.origin : "";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: "openid profile email"
      }}
    >
      {children}
    </Auth0Provider>
  );
}