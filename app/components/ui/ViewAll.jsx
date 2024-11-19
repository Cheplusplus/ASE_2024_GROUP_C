import React from "react";
import Image from "next/image";
import Link from "next/link";

const ViewAll = () => {
  return (
    <Link href="/all">
        <Image
          priority={true}
          style={{ objectFit: "cover", width: "auto", height: "auto" }}
          src={"/right.png"}
          alt={'next'}
          width={100}
          height={100}
          className="rounded-lg"
        />
    </Link>
  );
};

export default ViewAll;
