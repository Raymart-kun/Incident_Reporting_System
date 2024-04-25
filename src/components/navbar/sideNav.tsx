
import { NavLink, Outlet} from "react-router-dom";
import { FaFileCirclePlus } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { IoLogOut, IoPersonSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";

const NavList = [
  {
    name: "Create Report",
    route: "/create_report",
    Icon: <FaFileCirclePlus size={20} />,
  },
  {
    name: "Report List",
    route: "/report_list",
    Icon: <FaFileAlt size={20} />,
  },
  {
    name: "Profile",
    route: "/profile",
    Icon: <IoPersonSharp size={20} />,
  },
];

const SideNav = () => {
  return (
    <>
        <div className="flex min-h-[100vh] bg-primary p-2  flex-col min-w-[320px] h-full">
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex flex-col gap-5">
              <div className="px-3 mt-2">
                <p className="text-white text-2xl font-bold">Incident Report</p>
              </div>

              <div className="h-[1px] bg-white w-full" />

              <div className="flex flex-col gap-2">
                {NavList.map((nav) => (
                  <NavLink
                    to={nav.route}
                    key={nav.name}
                    className={({ isActive }) =>
                      cn(
                        "flex px-3 flex-row gap-3 items-center py-2 hover:bg-secondary group text-white hover:text-secondary-foreground",
                        { " bg-secondary text-sec": isActive }
                      )
                    }
                  >
                    {nav.Icon}
                    <p className="text-lg font-semibold ">{nav.name}</p>
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink
              to={"/sign-in"}
              className="flex px-3 flex-row gap-3 items-center py-2"
            >
              <IoLogOut color="white" size={20} />
              <p className="text-lg font-semibold text-white">Logout</p>
            </NavLink>
          </div>
        </div>
      <Outlet /> 
    </>
  );
};

export default SideNav;
