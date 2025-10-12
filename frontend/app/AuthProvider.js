"use client";

import { Auth0Provider } from "@auth0/auth0-react";

export default function AuthProvider({ children }) {
  const domain = "dev-du3sht0fwpp1csv1.us.auth0.com";
  const clientId = "9C7OPbsmdMqBFN74UmMnlp8noNtxWiMB";

 
  const redirectUri =
    typeof window !== "undefined" ? window.location.origin : "";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
    >
      {children}
    </Auth0Provider>
  );
}
