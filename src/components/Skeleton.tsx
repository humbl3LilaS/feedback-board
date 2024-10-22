import { cn } from "../util";

const Skeleton = ({ className }: { className?: string }) => {
	return <div className={cn("bg-paleGray/20 animate-pulse", className)} />;
};

export default Skeleton;
