import { Popover, Transition } from "@headlessui/react";
import Input from "shared/Input/Input";
import React, { Fragment, useState } from "react";
import Cart from "containers/Restauraunt/components/Cart";
import Modal from "containers/NavbarCart/Modal";

const SearchDropdown = () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<boolean>(true);

  const [showModelOpen, setShowModelOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleModalOpen = (val: boolean) => {
    setShowModelOpen(val);
  };

  const lenObj = JSON.parse(localStorage.getItem("cart-items") || "{}");
  const len = lenObj.length;
  console.log("JSON obj length: ", len);

  return (
    <React.Fragment>
      <Popover className="relative">
        {({ open }) => {
          if (open) {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          }
          return (
            <>
              <button
                className="block text-white
        font-medium text-sm text-left"
                type="button"
                data-modal-toggle="authentication-modal"
                onClick={() => {
                  setShowModelOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="w-6 h-6"
                  onClick={handleClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                  {len}
                </div>
              </button>

              <Modal isVisible={showModelOpen} closeModal={handleModalOpen}>
                <Cart newProduct={true} setNewProduct={setNewProduct} />
              </Modal>
            </>
          );
        }}
      </Popover>
    </React.Fragment>
  );
};

export default SearchDropdown;
