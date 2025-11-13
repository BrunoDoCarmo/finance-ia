import { CheckIcon, XIcon } from "lucide-react";
import Navbar from "../_components/navbar";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { Button } from "../_components/ui/button";

const SubscriptionPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex h-6 w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Assinatura</h1>
        </div>
        <div className="flex h-screen flex-1 flex-col items-center justify-center gap-6 md:flex-row">
          <Card className="w-[450px] border border-gray-400 dark:border-white/10">
            <CardHeader className="border-b border-gray-400 dark:border-white/10">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Apenas 10 transações por mês (7/10)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatório por IA</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[450px] border border-gray-400 dark:border-white/10">
            <CardHeader className="border-b border-gray-400 dark:border-white/10">
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatório por IA</p>
              </div>
              <Button className="w-full rounded-full">Adiquirir plano</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default SubscriptionPage;
