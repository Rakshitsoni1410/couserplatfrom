import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const EditCourse = () => {
  return (
    <div className="flex-1 ">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Add details information regarding course{" "}
        </h1>
        <Link to="/lecture">
          <Button className="hover:text-blue-600" variant="link">Go to lectures page</Button>
        </Link>
      </div>
    </div>
  );
};

export default EditCourse;
