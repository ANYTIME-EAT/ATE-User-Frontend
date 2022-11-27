import React, { FC } from "react";
import Heading from "components/Heading/Heading";

export interface Statistic {
  id: string;
  heading: string;
  address: string;
  icon:any;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: "Home",
    address:
      "Ms Michael 132, My Street, Kingston, My Street, Kingston,New York 12401.",
    icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
    </svg>
    
      
  },
  {
    id: "2",
    heading: "Other",
    address: "Ms Monica 144, My Street, Manhattan, My Street, Manhattan,New York 10451.",
    icon:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
  </svg>
  
  },
  
];

export interface ManageAddressProps {
  className?: string;
}

const ManageAddress: FC<ManageAddressProps> = ({ className = "" }) => {

//   const ManageAddress: FC<ManageAddressProps> = ({ className = "" }) => {
//     const [userAddress,setUserAddress] = useState<any>([])
//     //get user address
//    const getRestrauntData =async () => {
//     const response = await getAllUserAddress()
  
//     if(response.data){
//       let tempData : any  = [];
//       if(response.data.response === "success"){
//         response.data.address.map((item: any, key: number) => {
//           tempData[key] = {
//             id: item.id,
//             addressType: "Home",
//             address: item.address,
//         }      
//         })
//         setUserAddress(tempData)
//       }
      
//     }
//   }
//   useEffect(()=>{
//     getRestrauntData();
//   })
  
//     return (
//       <div className={`nc-ManageAddress relative ${className}`}>
//         <h1 className="font-semibold pb-8 text-xl ">Manage Address</h1>
//         <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-8 bg-neutral-50 px-10 py-10">
//           {userAddress.map((item:any) => (
//             <div
//               key={item.id}
//               className="p-6 bg-slate-100  dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
//             >
//               <div className="columns-8 ">
//               {/* <div>{item.icon}</div> */}
//               <h3 className="font-semibold leading-none text-neutral-900 md:text-lg dark:text-neutral-200">
//               {item.addressType}
//               </h3>
//               </div>
//               <span className="block text-sm text-neutral-500 mt-3 sm:text-sm dark:text-neutral-400 px-12">
//                 {item.address}
//               </span>
//             </div>
//           ))}
  
//         </div>
//       </div>
//     );
//   };
  return (
    <div className={`nc-ManageAddress relative ${className}`}>
      <h1 className="font-semibold pb-8 text-xl ">Manage Address</h1>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-8 bg-neutral-50 px-10 py-10">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-slate-100  dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <div className="columns-8 ">
            <div>{item.icon}</div>
            <h3 className="font-semibold leading-none text-neutral-900 md:text-lg dark:text-neutral-200">
            {item.heading}
            </h3>
            </div>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-sm dark:text-neutral-400 px-12">
              {item.address}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAddress;
