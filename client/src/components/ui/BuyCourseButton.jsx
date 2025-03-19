import { Button } from "@/components/ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, {data, isLoading ,isSuccess,isError,error}] = useCreateCheckoutSessionMutation(); // ✅ Fixed parentheses

  const purchaseCourseHandler = async () => {
    await createCheckoutSession({ courseId }); // ✅ Fixed function syntax
  };

  const navigate = useNavigate();

  const handleBuy = async () => {
    navigate(`/payment/${courseId}`);
  };
useEffect(()=>{
  if(isSuccess){
    if(data?.url){
      window.location.href ==data.url;//redirect to stripe 
    }else{
      toast.error("invalid response from server");
    }
  }
  if(isError){
    toast.error(error?.data?.message||"failed to create checkout session");
  }
},[data,isSuccess,isError,error])
  return (
    <Button className="w-full" onClick={handleBuy} disabled={isLoading}>
      {isLoading ? ( // ✅ Fixed syntax here
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        "Buy Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
