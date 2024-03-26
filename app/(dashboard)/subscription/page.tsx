import { checkSubscription } from "@/lib/subscription";
import { IoMdCash } from "react-icons/io";
import SubscriptionButton from "./_components/subscription-button";

const SubscriptionPage = async () => {
  const isPro = await checkSubscription();
  return (
    <>
      <div className="flex flex-row items-center gap-x-2 pt-5 px-6">
        <IoMdCash className="text-3xl text-orange-600" />
        <h1 className="text-2xl font-bold text-orange-600">Subscription</h1>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="text-2xl text-center">
          <p>👩‍💻 Hello 👩‍💻</p>
          {isPro ? (
            <p>
              You are Currently on {""}
              <span className="font-bold text-orange-500">Solux Pro</span> Plan
            </p>
          ) : (
            <p>You are Currently on {""}
              <span className="font-bold">Free</span> Plan
            </p>
          )}
          <SubscriptionButton isPro={isPro}/>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;