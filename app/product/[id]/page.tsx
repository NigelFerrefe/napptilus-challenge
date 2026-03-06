import BackButton from "@/components/detailPage/BackButton";
import ProductInfo from "@/components/detailPage/ProductInfo";
import SimilarItems from "@/components/detailPage/SimilarItems";
import SpecsInfo from "@/components/detailPage/SpecsInfo";
import { getPhoneById } from "@/lib/api/api";
import { PhoneDetail } from "@/lib/api/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const product = await getPhoneById(id);
  return {
    title: product?.name ?? "Product not found",
    description: product?.description,
  };
}

const DetailPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const product: PhoneDetail | null = await getPhoneById(id);
  if (!product) notFound();

  return (
    <main className="detailPageContainer">
      <BackButton />
      <div className="productContainer">
        <ProductInfo product={product} />
        <SpecsInfo product={product} />
        <SimilarItems product={product} />
      </div>
    </main>
  );
};

export default DetailPage;
