import Navbar from "@/app/_components/navbar";
import ClientPage from "../register/client/page";
import ProductPage from "../register/product/page";
import SupplierPage from "../register/supplier/page";
import NotFound from "../not-found";

interface Props {
  params: {
    slug: string;
  };
}

export default function RegisterSlugRouter({ params }: Props) {
  const { slug } = params;

  console.log("SLUG RECEBIDO:", slug); // Debug

  // slug vem como: "register=client"
  const decoded = decodeURIComponent(slug);
  const [prefix, section] = decoded.split("=");

  if (prefix !== "register") {
    return (
      // <>
      //   <Navbar />
      //   <div className="p-6">
      //     <h1 className="text-2xl font-bold text-red-500">Rota inválida</h1>
      //     <p className="text-muted">Prefixo deve ser register </p>
      //   </div>
      // </>
      <NotFound />
    );
  }
  switch (section) {
    case "client":
      return <ClientPage />;

    case "product":
      return <ProductPage />;

    case "supplier":
      return <SupplierPage />;

    default:
      return (
        <>
          <Navbar />
          <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
            <h1 className="text-9xl font-bold text-gray-800 dark:text-white">
              Página não encontrada
            </h1>
            <p className="mt-4 text-3xl text-gray-600 dark:text-white">
              A seção {section} não existe.
            </p>
          </div>
        </>
      );
  }
}
