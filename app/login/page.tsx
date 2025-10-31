import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RefreshOnLogin } from "../_components/refresh-on-login";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="relative flex h-full flex-col md:grid md:grid-cols-2">
      <RefreshOnLogin />
      {/* ESQUERDA */}
      <div className="relative z-10 flex h-screen w-full flex-col justify-center py-16 text-white sm:px-10 md:mx-auto md:max-w-[550px]">
        <div className="flex flex-col items-center bg-black p-8 md:items-start md:bg-transparent">
          {/* LOGO */}
          <Image
            src="/logo.svg"
            width={173}
            height={39}
            alt="Finance AI"
            className="mb-8 brightness-200 md:brightness-100"
          />

          {/* TÍTULO */}
          <h1 className="mb-4 text-center text-4xl font-bold md:text-left">
            Bem-vindo
          </h1>

          {/* DESCRIÇÃO */}
          <p className="mb-10 max-w-md text-center text-gray-200 md:text-left md:text-muted-foreground">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>

          {/* BOTÃO */}
          <SignInButton>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-white hover:bg-white hover:text-black md:border-gray-300"
            >
              <LogInIcon className="h-5 w-5" />
              Fazer login ou criar conta
            </Button>
          </SignInButton>
        </div>
      </div>

      {/* DIREITA */}
      <div className="absolute inset-0 md:relative md:inset-auto">
        <Image
          src="/login.png"
          alt="Tela de login"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
