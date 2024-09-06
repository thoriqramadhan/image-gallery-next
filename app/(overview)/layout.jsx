import Sidenav from "@/app/ui/Sidenav";

export default function BaseLayout({ children }) {
  return (
    <div className="w-full h-full relative md:flex">
      <Sidenav />
      {children}
    </div>
  );
}
