import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

export function SignupForm({
  className,
  ...props
}) {

  const { register } = useForm({})

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bem vindo</h1>
                <p className="text-balance text-muted-foreground">
                  Crie aqui sua conta Thevent
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Nome de usuário</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="fulaninho_235"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Repita sua senha</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Registrar-se
              </Button>
              <div className="text-center text-sm">
                Já possui uma conta?{" "}
                <Link href="/auth/signin" className="underline underline-offset-4">
                  Entre aqui
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/images/runing_warming.jpg"
              width={5472}
              height={3648}
              alt="Running Warming"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Clicando em "Entrar" você concorda com nosss <Link href="#">Termos de Serviço </Link>{" "}
        e nossas <Link href="#">Politicas de Privacidade</Link>.
      </div>
    </div>
  )
}
