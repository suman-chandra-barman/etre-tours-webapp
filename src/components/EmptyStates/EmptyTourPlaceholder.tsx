import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import bus from "@/assets/bus.png";
import { Plus } from "lucide-react";

function EmptyTourPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <article className="text-center pb-50">
        <Image src={bus} alt="Bus Image" className="w-50" />
        <div className="space-y-2 pt-4">
          <p className="text-xl font-semibold">No tours found today!</p>
          <p>Get started to setup a tour now</p>
          <Button className="bg-[#70B7E5] hover:bg-[#5a9bd8] rounded-full text-black">
            <Plus /> Let&apos;s start
          </Button>
        </div>
      </article>
    </div>
  );
}

export default EmptyTourPlaceholder;
