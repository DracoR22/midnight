
import ReactLoading from "react-loading";
import { GreenHorn, GreenPeople, GreenPlay } from "./Icons/GreenIcons";

export function ErrorMessage({
  children,
  message,
  description,
  icon,
}: {
  children?: React.ReactNode;
  icon?: string;
  message: string;
  description?: string;
}) {
  const IconSelection = ({
    icon,
    className,
  }: {
    icon?: string;
    className: string;
  }) => {
    if (icon === "GreenHorn") {
      return <GreenHorn className={className} />;
    } else if (icon === "GreenPeople") {
      return <GreenPeople className={className} />;
    } else {
      return <GreenPlay className={className} />;
    }
  };

  return (
    <div className="relative mt-16 flex w-full  flex-col items-center justify-center gap-2 text-center">
      <IconSelection className="center items-center" icon={icon} />
      <h1 className="text-2xl font-semibold text-neutral-100">{message}</h1>
      <p className="max-w-xs text-neutral-300">{description}</p>
      {children}
    </div>
  );
}

export function LoadingMessage() {
  return (
    <div className="relative mt-16 flex w-full  flex-col items-center justify-center gap-2 text-center">
      <ReactLoading
        type={"spin"}
        color={"#FFFFFF"}
        height={70}
        width={70}
      />
      <h1 className="text-2xl font-semibold text-neutral-100">Loading</h1>
    </div>
  );
}