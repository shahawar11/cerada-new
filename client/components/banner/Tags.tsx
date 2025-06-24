import Image from "next/image";
import React from "react";

function Tags() {
  return (
    <div className="bg-gray-100 px-5 sm:px-10 md:px-12 lg:px-16 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6 place-items-center">
        <Image
          src="/cerada.png"
          alt="CERADA Logo"
          width={100}
          height={100}
          className="object-contain rounded-md"
        />
        <Image
          src="/CompanyLogo.png"
          alt="Confworld Logo"
          width={100}
          height={100}
          className="object-contain rounded-full"
        />
        <Image
          src="/scopus.png"
          alt="Scopus Indexed Logo"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/clarivate.png"
          alt="Clarivate Analytics Logo"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg2.png"
          alt="SDG 2 - Zero Hunger"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg3.png"
          alt="SDG 3 - Good Health and Well-being"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg4.png"
          alt="SDG 4 - Quality Education"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg5.png"
          alt="SDG 5 - Gender Equality"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg6.png"
          alt="SDG 6 - Clean Water and Sanitation"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg8.png"
          alt="SDG 8 - Decent Work and Economic Growth"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg9.png"
          alt="SDG 9 - Industry, Innovation, and Infrastructure"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg10.png"
          alt="SDG 10 - Reduced Inequalities"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg11.png"
          alt="SDG 11 - Sustainable Cities and Communities"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg12.png"
          alt="SDG 12 - Responsible Consumption and Production"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg13.png"
          alt="SDG 13 - Climate Action"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/sdg16.png"
          alt="SDG 16 - Peace, Justice and Strong Institutions"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default Tags;
