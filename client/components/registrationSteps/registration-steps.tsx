import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export function RegistrationSteps() {
  const data = [
    {
      title: "Choose Your Preferred Admittance Category",
      content: (
        <div>
          
          <div className="flex justify-center">
            <Image
              src="/step1.png"
              alt="Step 1 - Choose Admittance Category"
              width={300}
              height={200}
              className="h-32 w-48 object-contain md:h-40 md:w-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Enter your details in the form",
      content: (
        <div>
          
          <div className="flex justify-center">
            <Image
              src="/step2.png"
              alt="Step 2 - Fill Registration Form"
              width={300}
              height={200}
              className="h-32 w-48 object-contain md:h-40 md:w-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Proceed to Payment Gateway",
      content: (
        <div>
          
          <div className="flex justify-center">
            <Image
              src="/step3.png"
              alt="Step 3 - Payment Gateway"
              width={300}
              height={200}
              className="h-32 w-48 object-contain md:h-40 md:w-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Get an official conference invitation letter",
      content: (
        <div>
          
          <div className="flex justify-center">
            <Image
              src="/step4.png"
              alt="Step 4 - Invitation Letter"
              width={300}
              height={200}
              className="h-32 w-48 object-contain md:h-40 md:w-60"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip text-center">
      <h1 className="font-bold text-3xl  xl:text-4xl text-blue-900 dark:text-white">
        Registration Steps
      </h1>
      <Timeline data={data} />
    </div>
  );
}
