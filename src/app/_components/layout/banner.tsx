import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'

interface BannerProps {
    type: "info" | "success" | "warning" | "error",
    heading: string,
    children: React.ReactNode
}

type BannerConfiguration = {
    icon: typeof ExclamationTriangleIcon
    color: string
}

const BannerTypes = new Map<string, BannerConfiguration>();
BannerTypes.set("info", { icon: InformationCircleIcon, color: "blue" });
BannerTypes.set("success", { icon: CheckCircleIcon, color: "green" });
BannerTypes.set("warning", { icon: ExclamationTriangleIcon, color: "yellow" });
BannerTypes.set("error", { icon: XCircleIcon, color: "red" });

export default function Banner({ type, heading, children }: BannerProps) {
    const bannerConfig = BannerTypes.get(type);
    const Icon = bannerConfig?.icon ?? QuestionMarkCircleIcon
    return (
        <div className={`rounded-md bg-${bannerConfig?.color}-50 dark:bg-${bannerConfig?.color}-100 my-4 p-4`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <Icon className={`h-5 w-5 text-${bannerConfig?.color}-400`} aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className={`text-sm font-medium text-${bannerConfig?.color}-800`}>{heading}</h3>
                    <div className={`mt-2 text-sm text-${bannerConfig?.color}-700`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}