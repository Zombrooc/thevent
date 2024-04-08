import { Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function UserSetupLayout({ children }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-6 py-12 lg:px-8 ">
      <div className="absolute top-0 left-0 p-4">
        <Button variant="ghost" asChild>
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Voltar para a página
            inicial
          </Link>
        </Button>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          width="40"
          height="40"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white p-6 rounded-lg shadow-lg border-border transform -translate-y-1/4">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
