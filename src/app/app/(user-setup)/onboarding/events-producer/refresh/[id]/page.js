import React, { useState } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default function Refresh({ params }) {
  const connectedAccountId = params?.id;
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    if (connectedAccountId) {
      setAccountLinkCreatePending(true);
      fetch("/api/stripe/account_link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: connectedAccountId,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setAccountLinkCreatePending(false);
          console.log(json);
          const { url, error } = json;

          if (url) {
            redirect(url);
          }

          if (error) {
            setError(true);
          }
        });
    }
  }, [connectedAccountId]);

  return (
    <div className="container">
      <div className="banner">
        <h2>Thevent</h2>
      </div>
      <div className="content">
        <h2>Add information to start accepting money</h2>
        <p>
          Thevent is the worlds leading air travel platform: join our team of
          pilots to help people travel faster.
        </p>
        {error && <p className="error">Something went wrong!</p>}
      </div>
      <div className="dev-callout">
        {connectedAccountId && (
          <p>
            Your connected account ID is:{" "}
            <code className="bold">{connectedAccountId}</code>
          </p>
        )}
        {accountLinkCreatePending && <p>Creating a new Account Link...</p>}
      </div>
    </div>
  );
}
