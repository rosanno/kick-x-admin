import { FaStar } from "react-icons/fa";

export const ProductReviews = () => {
  return (
    <div className="pt-5 space-y-4">
      <h3 className="text-sm font-medium">
        Ratings & Reviews
      </h3>
      <div className="flex gap-5">
        <div className="w-[270px] flex items-center gap-1 px-4 py-2.5 bg-[#F3F6F9] rounded-md">
          {[1, 2, 3, 4, 5].map((index) => (
            <FaStar
              key={index}
              className="h-4 w-4 text-yellow-400"
            />
          ))}
          <p className="text-[13px] text-muted-foreground font-medium ml-auto">
            4.5 out of 5
          </p>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">Reviews:</h3>
        </div>
      </div>
    </div>
  );
};
