import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BuyCourseButton = ({ courseId }) => {
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate(`/payment/${courseId}`);
  };

  return (
    <Button className="w-full" onClick={handleBuy}>
      Buy Course
    </Button>
  );
};

export default BuyCourseButton;
