import React, { FC, useEffect, useMemo, useState } from "react";
import Heading from "components/Heading/Heading";
import { getAllUserAddress } from "services/apiServices";
import Modal from "../components/Modal";
import { BiHome, BiLocationPlus } from "react-icons/bi";
import { FaBusinessTime } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import NavItem from "shared/NavItem/NavItem";
import { add } from "lodash";
import { updateProfile } from "services/apiServices";

export interface Statistic {
  id: string;
  heading: string;
  address: string;
  icon: any;
}
export interface ManageAddressProps {
  className?: string;
}

const ManageAddress: FC<ManageAddressProps> = ({ className = "" }) => {
  const [userAddress, setUserAddress] = useState<any>([]);
  const [showModel, setShowModel] = useState(false);
  const [showModel3, setShowModel3] = useState(false);
  const [showModel2, setShowModel2] = useState(false);
  const [address, setAddress] = useState<any>([]);
  const [addressType, setAddressType] = useState("");
  
  const [selectedAddressType, setSelectedAddressType] = useState<string>("");

  //get user address
  const getAllAddressData = async () => {
    const response = await getAllUserAddress(1);
    console.log(response.data);
    if (response.data) {
      if (response.data.data.length > 0) {
        let addressArr = response.data.data;
        let tempData: any = [];
        // addressArr.map((item: any, key: number) => {
        //   tempData[key] = {
        //     addressType: item.type,
        //     address: item.address,
        //   };
        // });
        console.log(tempData);
        setUserAddress(addressArr);
      }
    }
  };

  useEffect(() => {
    getAllAddressData();
    setAddress(address);
  }, []);
  const handleTypeChange = (type: string) => {
    setSelectedAddressType(type);
  };

  const handleModal = (val: boolean) => {
    setShowModel(val);
  };

  const handleSubmit = () => {};

  const removeAddressHandler = async () => {
    const newAddressList = userAddress.filter(
      (item: any) => item.type !== selectedAddressType
    );
    const response = await updateProfile({ address: newAddressList });
    setUserAddress(newAddressList);
    
    if (response.data) {
      if (response.data.response === "success") {
        handleModal(false);
      } else {
        alert("Not deleted");
      }
    }
  };

  const updateAddress = async () => {
    userAddress.map((item: any, key: number) => {
      if (item.type === selectedAddressType) {
        userAddress[key] = {
          type: item.type,
          address: address,
        };
      }
    });
    const response = await updateProfile({ address: userAddress });
    setUserAddress(userAddress);
    if (response.data) {
      if (response.data.response === "success") {
        handleModal(false);
      } else {
        alert("Not updated");
      }
    }
  };

  const handleAddressCreate = async() => {  
    
    const data = {
      type: addressType,
      address: address,
    }
    let temp=[...userAddress,data]
    const response = await updateProfile({ address: temp });
    console.log(response)
    if(response.data){
      if(response.data === "success"){
        setUserAddress(temp)
        handleModal(false);
      }else{
        console.log("cannot add address")
      }
    }
  }

  return (
    <div className={`nc-ManageAddress relative ${className}`}>
      <div className="grid grid-cols-6 gap-4">
          <h1 className="font-semibold pb-8 text-xl col-span-4">Manage Address</h1>
      <button
        className="block text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
        focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 
        dark:hover:bg-red-700 dark:focus:ring-red-800 "
        type="button"
        data-modal-toggle="authentication-modal"
        onClick={() => {
          // handleTypeChange(item.addressType);
          setShowModel3(true);
        }}
      >
        Add
      </button>
      </div>
      {/* <div className="p-10 text-center"></div> */}

      <Modal isVisible={showModel3} closeModal={handleModal}>
     
        <div className="px-6 py-6 lg:px-8">
          
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="addressType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                address type
              </label>
              <input
                type="text"
                name="addressType"
                id="addressType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                
                onChange={(e) => setAddressType(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your address
              </label>
              <input
                type="address"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <div className="p-6 text-center">
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={()=>{setShowModel(false)}}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none 
                focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex 
                items-center px-5 py-2.5 text-center ml-2"
                onClick={handleAddressCreate} 
                
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isVisible={showModel} closeModal={handleModal}>
        {/* onClose={handleModal} */}
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Edit Address
          </h3>
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your address
              </label>
              <input
                type="address"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <div className="p-6 text-center">
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={()=>{setShowModel(false)}}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ml-2"
                onClick={updateAddress}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isVisible={showModel2} closeModal={handleModal}>
        <div className="px-6 py-6 lg:px-8">
          <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this Address?
              </h3>
              <button
                onClick={removeAddressHandler}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={()=>{setShowModel(false)}}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-8 px-2 py-4">
        {userAddress.map((item: any) => (
          <div
            key={item.id}
            className="p-6 bg-slate-100  dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <div className="columns-8 ">
              {item.type == "Home" ? (
                <BiHome />
              ) : item.type == "Bussiness" ? (
                <FaBusinessTime />
              ) : (
                <BiLocationPlus />
              )}
              <h3 className="font-semibold leading-none text-neutral-900 md:text-lg dark:text-neutral-200">
                {item.type}
              </h3>
            </div>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-xs dark:text-neutral-400 px-10">
              {item.address}
            </span>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {/* <button
                onClick={() => {
                  handleTypeChange(item.type);
                  setShowModel(true);
                }}
              >
                <TbEdit />
              </button> */}

              <a className="cursor-pointer px-10 text-xs text-red-500 "
                onClick={() => {
                  handleTypeChange(item.type);
                  setShowModel(true);
                }}
              >
                Edit
              </a>

              <div className="pl-20 pr-5">
                {/* <button
                  onClick={() => {
                    handleTypeChange(item.type);
                    setShowModel2(true);
                  }}
                >
                  <RiDeleteBinLine />
                </button> */}

              <a className="cursor-pointer px-25 pt-20 text-xs text-red-500"
                onClick={() => {
                  handleTypeChange(item.type);
                  setShowModel2(true);
                }}
              >
                Delete
              </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ManageAddress;
