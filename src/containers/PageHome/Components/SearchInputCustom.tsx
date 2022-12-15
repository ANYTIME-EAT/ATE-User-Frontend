import React, { useState } from "react";
import { FC } from "react";
import { useEffect } from "react";
import ClearDataButton from "components/HeroSearchForm2/ClearDataButton";
import { useRef } from "react";
import ButtonSubmit from "components/HeroSearchForm2Mobile/ButtonSubmit";
export interface SearchInputCustomProps {
    defaultValue: string;
    onChange?: (value: string) => void;
    onInputDone?: (value: string) => void;
    placeHolder?: string;
    desc?: string;
    className?: string;
    autoFocus?: boolean;
}

const SearchInputCustom: FC<SearchInputCustomProps> = ({
    defaultValue,
    autoFocus = false,
    onChange,
    onInputDone,
    placeHolder = "Resturaunt and Foods",
    desc = "",
    className = "",
}) => {
    const containerRefnew = useRef<HTMLDivElement>(null);
    const inputRefnew = useRef<HTMLInputElement>(null);

    const [valueNew, setValuenew] = useState(defaultValue);
    const [showPopovernew, setShowPopovernew] = useState(autoFocus);

    useEffect(() => {
        setValuenew(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        setShowPopovernew(autoFocus);
    }, [autoFocus]);

    useEffect(() => {
        if (eventClickOutsideDiv) {
            document.removeEventListener("click", eventClickOutsideDiv);
        }
        showPopovernew && document.addEventListener("click", eventClickOutsideDiv);
        return () => {
            document.removeEventListener("click", eventClickOutsideDiv);
        };
    }, [showPopovernew]);

    useEffect(() => {
        if (showPopovernew && inputRefnew.current) {
            inputRefnew.current.focus();
        }
    }, [showPopovernew]);

    const eventClickOutsideDiv = (event: MouseEvent) => {
        if (!containerRefnew.current) return;
        // CLICK IN_SIDE
        if (!showPopovernew || containerRefnew.current.contains(event.target as Node)) {
            return;
        }
        // CLICK OUT_SIDE
        setShowPopovernew(false);
    };

    const handleSelectLoc = (item: string) => {
        setValuenew(item);
        onInputDone && onInputDone(item);
        setShowPopovernew(false);
    };

    const renderRecentSearches = () => {
        return (
            <>
                <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
                    Recent searches
                </h3>
                <div className="mt-2">
                    {[
                        "Pasta",
                        "Steak House",
                        "Fried Chiken",
                        "coke",
                    ].map((item) => (
                        <span
                            onClick={() => handleSelectLoc(item)}
                            key={item}
                            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                        >
                            <span className="block text-neutral-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 sm:h-6 w-4 sm:w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </span>
                            <span className=" block font-medium text-neutral-700 dark:text-neutral-200">
                                {item}
                            </span>
                        </span>
                    ))}
                </div>
            </>
        );
    };

    const renderSearchValue = () => {
        return (
            <>
                {[
                    
                ].map((item) => (
                    <span
                        onClick={() => handleSelectLoc(item)}
                        key={item}
                        className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                    >
                        <span className="block text-neutral-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-6 sm:w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </span>
                        <span className="block font-medium text text-neutral-700 dark:text-neutral-200">
                            {item}
                        </span>
                    </span>
                ))}
            </>
        );
    };

    return (
        <div className={`relative flex ${className}`} ref={containerRefnew}>
            <div
                onClick={() => setShowPopovernew(true)}
                className={`flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${showPopovernew ? "nc-hero-field-focused" : ""
                    }`}
            >
                <div className="text-neutral-300 dark:text-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </div>
                <div className="flex-grow">
                    <input
                        className={`block w-full text-black bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                        placeholder={placeHolder}
                        value={valueNew}
                        autoFocus={showPopovernew}
                        onChange={(e) => {
                            setValuenew(e.currentTarget.value);
                            onChange && onChange(e.currentTarget.value);
                        }}
                        ref={inputRefnew}
                    />
                    <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                        <span className="line-clamp-1">{!!valueNew ? placeHolder : desc}</span>
                    </span>
                    {valueNew && showPopovernew && (
                        <ClearDataButton
                            onClick={() => {
                                setValuenew("");
                                onChange && onChange("");
                            }}
                        />
                    )}
                </div>
            </div>
            {showPopovernew && (
                <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
                    {valueNew ? renderSearchValue() : renderRecentSearches()}
                </div>

            )}
        </div>
    );
};

export default SearchInputCustom;
