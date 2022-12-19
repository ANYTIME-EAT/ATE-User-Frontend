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
  const [showModelEdit, setShowModelEdit] = useState(false);
  const [showModelAdd, setShowModelAdd] = useState(false);
  const [showModelDelete, setShowModelDelete] = useState(false);
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

  const handleModalEdit = (val: boolean) => {
    setShowModelEdit(val);
  };

  const handleModalDelete = (val: boolean) => {
    setShowModelDelete(val);
  };

  const handleModalAdd = (val: boolean) => {
    setShowModelAdd(val);
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
        handleModalDelete(false);
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
        handleModalEdit(false);
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
        handleModalAdd(false);
      }else{
        console.log("cannot add address")
      }
    }
  }
  return (
    <div className={`nc-ManageAddress relative ${className}`}>
      <div className="grid grid-cols-12 gap-4">
          <h1 className="font-semibold pb-8 text-xl xl:col-span-11 col-span-10 ">Manage Address</h1>
    <button
        className="block text-white
        font-medium text-sm text-left"
        type="button"
        data-modal-toggle="authentication-modal"
        onClick={() => {
          setShowModelAdd(true);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      </div>

      <Modal isVisible={showModelAdd} closeModal={handleModalAdd}>
     
        <div className="px-6 py-6 lg:px-8 z-40">
          
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
                onClick={()=>{setShowModelAdd(false)}}
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

      <Modal isVisible={showModelEdit} closeModal={handleModalEdit}>
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
                onClick={()=>{setShowModelEdit(false)}}
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

      <Modal isVisible={showModelDelete} closeModal={handleModalDelete}>
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
                onClick={()=>{setShowModelDelete(false)}}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-12 ">
        {userAddress.map((item: any) => (
          <div
            key={item.id}
            className="p-6 bg-slate-100  dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
        
          <div className="columns-8 ">
              {item.type == "Home" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              ) : item.type == "Bussiness" ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>

              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

              )}
              <h3 className="font-semibold leading-none text-neutral-900 md:text-lg dark:text-neutral-200">
                {item.type}
              </h3>
            </div>
            <span className="block text-sm text-neutral-500 mt-1 sm:text-xs dark:text-neutral-400 xl:px-14 lg:px-12 px-8">
              {item.address}
            </span>

            <div className="grid grid-cols-6 gap-4 mt-4">
              <a className="cursor-pointer text-xs text-red-500 lg:px-12 px-8 xl:px-14"
                onClick={() => {
                  handleTypeChange(item.type);
                  setShowModelEdit(true);
                }}
              >
                EDIT
              </a>

              <a className="cursor-pointer text-xs text-red-500 ml-20"
                onClick={() => {
                  handleTypeChange(item.type);
                  setShowModelDelete(true);
                }}
              >
                DELETE
              </a>
              </div>
            </div>
          // </div>
        ))}
      </div>
    </div>
  );
};
export default ManageAddress;
