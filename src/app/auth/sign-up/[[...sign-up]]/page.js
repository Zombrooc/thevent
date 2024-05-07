"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ClerkAPIErrorJSON } from "@clerk/types";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createStripeCustomer } from "@/lib/stripe";
import { createUserPrivateMetadata } from "@/lib/createUserPrivateMetadata";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // This function will handle the user submitting their email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setError(undefined);

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form and capture the OTP code
      setVerifying(true);
    } catch (err) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error: ", JSON.stringify(err, null, 2));
      setError(err);
    }
  };

  // This function will handle the user submitting a code for verification
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setError(undefined);

    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        const fullName = `${firstName} ${lastName}`;
        const { id } = await createStripeCustomer(emailAddress, fullName);

        await createUserPrivateMetadata(
          completeSignUp.createdUserId,
          (stripeId = id)
        );

        console.log(completeSignUp);
        await setActive({ session: completeSignUp.createdSessionId });
        // Redirect the user to a post sign-up route
        router.push("/");
      }
    } catch (err) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error:", JSON.stringify(err, null, 2));

      err.errors.map((error) => {
        switch (error.code) {
          case "session_exists":
            router.push("/");
        }
        return;
      });
    }
  };

  // Once the sign-up form was submitted, verifying was set to true and as a result, this verification form is presented to the user to input their verification code.
  if (verifying) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Valide seu e-mail</CardTitle>
            <CardDescription>
              Enter your information to create an account Digite aqui o código
              enviado para o e-mail {emailAddress}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify}>
              <div className="space-y-2 flex justify-center items-center pb-5">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(code) => setCode(code)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button type="submit" className="w-full mt-3">
                Validar e-mail
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Cadastre-se</CardTitle>
          <CardDescription>
            Informe alguns dados para poder criar uma conta.
          </CardDescription>
          {error?.errors[0].code === "form_identifier_exists" ? (
            <Alert>
              <ExclamationTriangleIcon className="h-4 w-4" />

              <AlertTitle>Esse usuário já existe!</AlertTitle>
              <AlertDescription>
                O usuário com esse e-mail já existe.
                <br />
                <Link href="auth/sign-in" className="underline text-primary">
                  {" "}
                  Faça login
                </Link>{" "}
                ou tente outro.
              </AlertDescription>
            </Alert>
          ) : null}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    placeholder="Fulano"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    placeholder="de Tal"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  required
                  id="email"
                  type="email"
                  name="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Criar conta
              </Button>
              {/* <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button> */}
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/auth/sign-in" className="underline">
              Entre agora.
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
