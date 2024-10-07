import { cn } from "@/lib/utils";
import BlurryBlob from "../blurryBlob";

export const Lights: React.FC<{ className?: React.ReactNode }> = ({
  className,
}) => (
  <div className={cn("w-full h-full overflow-hidden flex justify-center items-center", className)}>
    <BlurryBlob
      className="rounded-xl opacity-45"
      firstBlobColor="#420000"
      secondBlobColor="hsla(0, 100%, 13%, 1)"
    />
  </div>
);
