import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

interface BannerProps {
  type: "info" | "success" | "warning" | "error";
  heading: string;
  children: React.ReactNode;
}

const icons = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
};

const backgroundColors = {
  info: "bg-blue-50 dark:bg-blue-100",
  success: "bg-green-50 dark:bg-green-100",
  warning: "bg-yellow-50 dark:bg-yellow-100",
  error: "bg-red-50 dark:bg-red-100",
};

const iconColors = {
  info: "fill-blue-400",
  success: "fill-green-400",
  warning: "fill-yellow-400",
  error: "fill-red-400",
};

const headerColors = {
  info: "text-blue-800",
  success: "text-green-800",
  warning: "text-yellow-800",
  error: "text-red-800",
};

const textColors = {
  info: "text-blue-700",
  success: "text-green-700",
  warning: "text-yellow-700",
  error: "text-red-700",
};

export default function Banner({ type, heading, children }: BannerProps) {
  const Icon = icons[type];
  return (
    <div className={`my-4 rounded-md p-4 ${backgroundColors[type]}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColors[type]}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-bold ${headerColors[type]}`}>
            {heading}
          </h3>
          <div className={`mt-2 text-sm ${textColors[type]}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
