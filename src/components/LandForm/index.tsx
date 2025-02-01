import { FC } from "react";
import Input from "../Input";

const LandForm: FC = () => {
  return (
    <form action="">
      <Input name="upi" label="UPI" placeholder="UPI" onChange={() => {}} />
      <Input
        name="landSize"
        label="Land size in Acres"
        placeholder="0.5"
        onChange={() => {}}
      />
      <Input
        name="location"
        label="Location (optional)"
        placeholder="Kigali, Rwanda"
        onChange={() => {}}
      />
    </form>
  );
};

export default LandForm;
