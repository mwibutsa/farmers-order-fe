import { FC } from "react";
import Button from "../Button";

const LandCard: FC = () => {
  return (
    <div className="flex flex-col border border-green-700 w-64 p-4 rounded">
      <ul>
        <li>
          <span className="font-semibold mr-2">UPI: </span>
          <span className="text-gray-700 font-thin text-lg">
            1/01/03/06/4562
          </span>
        </li>
        <li>
          <span className="font-semibold mr-2">SIZE:</span>
          <span className="text-gray-700 font-thin text-lg">3 acres</span>
        </li>
        <li>
          <span className="font-semibold mr-2">Location:</span>
          <span className="text-gray-700 font-thin text-lg">
            Kigali, Rwanda
          </span>
        </li>
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
