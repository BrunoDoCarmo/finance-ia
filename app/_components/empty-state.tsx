import { Card, CardContent } from "./ui/card";

const EmptyState = () => {
  return (
    <Card className="flex h-full flex-1 flex-col border-none shadow-none">
      <CardContent className="flex h-full flex-1 items-center justify-center text-center text-sm text-muted-foreground">
        Nenhum dado disponível para o período selecionado.
      </CardContent>
    </Card>
  );
};

export default EmptyState;
