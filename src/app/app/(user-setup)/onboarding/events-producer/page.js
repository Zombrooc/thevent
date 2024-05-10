"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function EventsProducerOnBoarding() {
  const router = useRouter();

  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState();

  useEffect(() => {
    setAccountCreatePending(true);
    setError(false);
    fetch("/api/stripe/accounts", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((json) => {
        setAccountCreatePending(false);

        const { account, error } = json;

        console.log(account);

        if (account) {
          setConnectedAccountId(account);
          setAccountLinkCreatePending(true);

          console.log("Connect Account ID: ", account);
          setError(false);
          fetch("/api/stripe/account_link", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              account: account,
            }),
          })
            .then((response) => response.json())
            .then((json) => {
              setAccountLinkCreatePending(false);

              const { url, error } = json;
              if (url) {
                router.push(url);
              }

              if (error) {
                setError(true);
              }
            });
        }

        if (error) {
          setError(true);
        }
      });
  }, []);

  return (
    <div className="container">
      <div className="banner">
        <h2>Thevent</h2>
      </div>
      {error && <p className="error">Something went wrong!</p>}
      {(connectedAccountId ||
        accountCreatePending ||
        accountLinkCreatePending) && (
        <div className="dev-callout">
          {connectedAccountId && (
            <p>
              Your connected account ID is:{" "}
              <code className="bold">{connectedAccountId}</code>
            </p>
          )}
          {accountCreatePending && <p>Creating a connected account...</p>}
          {accountLinkCreatePending && <p>Creating a new Account Link...</p>}
        </div>
      )}
    </div>
  );
}
