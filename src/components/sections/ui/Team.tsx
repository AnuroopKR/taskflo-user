import {dummyUsers} from "@/data/dummyData";
import { Search } from "lucide-react";
import Link from "next/link";

const Team = () => {
  const employees = dummyUsers;
  return (
    <div className="w-full h-full bg-slate-50 p-3 rounded-lg">
      <div className="h-12  p-2 flex justify-between">
        <h1 className="text-2xl">Team Members</h1>
        <div>
          <button className="w-20 h-8 bg-amber-200 font-semibold rounded-md">
            Add
          </button>
        </div>
      </div>
      <div className="bg-white h-10 rounded-full m-1 mx-3 flex">
        <input
          type="text"
          placeholder="Search"
          className="h-10 px-4 w-full rounded-full "
        />
        <Search className="m-2 mx-4" />
      </div>
      <div className="m-1 mx-3 ">
        {employees.map((item)=>(
           <Link key={item.id} href={`/dashboard/employees/${item.id}`}> <div 
            className="m-1 bg-white p-2 rounded-md">
               <h1 className="font-semibold"> {item.name}</h1>
               <h3 className="font-light">{item.email}</h3>
            </div></Link>
        ))}
      </div>
    </div>
  );
};

export default Team;
