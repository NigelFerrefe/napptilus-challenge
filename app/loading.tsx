import Image from "next/image";
import loader from "@/assets/loader.gif";

const LoadingPage = () => {
  return (
    <div className="loader">
      <Image src={loader} alt="Loading..." width={50} height={50} />
    </div>
  );
};

export default LoadingPage;