import { Contacts } from "./Sections/Contacts";
import { Donors } from "./Sections/Donors";
import { Hero } from "./Sections/Hero";
import { Hospitals } from "./Sections/Hospitals";
import { HowItWorks } from "./Sections/HowItworks";

export const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Hospitals />
      <Donors />
      <Contacts />
    </div>
  );
};
