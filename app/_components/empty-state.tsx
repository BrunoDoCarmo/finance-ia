import { Card, CardContent } from "./ui/card";

const EmptyState = () => {
  return (
    <Card className="flex flex-col p-10">
      <CardContent className="flex-1 pb-0">
        <div className="flex h-full w-full items-center justify-center text-center text-sm text-muted-foreground">
          Nenhum dado disponível para o período selecionado.
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
