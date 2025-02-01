import { FC } from "react";
import Button from "../Button";
import { ILand } from "@/hooks/userLand";

const LandCard: FC<{ land: ILand }> = ({ land }) => {
  return (
    <div className="flex flex-col border border-green-700 w-64 p-4 rounded">
      <ul>
        <li>
          <span className="font-semibold mr-2">UPI: </span>
          <span className="text-gray-700 font-thin text-lg">{land.upi}</span>
        </li>
        <li>
          <span className="font-semibold mr-2">SIZE:</span>
          <span className="text-gray-700 font-thin text-lg">
            {land.landSize} acres
          </span>
        </li>
        {land.location ? (
          <li className="mt-4">
            <span className="text-gray-500 italic text-sm font-thin  inline-block max-w-36 truncate">
              {land.location}
            </span>
          </li>
        ) : null}
      </ul>

      <div className="flex gap-1 mt-4">
        <Button>Edit</Button>
        <Button>Delete</Button>
        <Button>Order</Button>
      </div>
    </div>
  );
};

export default LandCard;
