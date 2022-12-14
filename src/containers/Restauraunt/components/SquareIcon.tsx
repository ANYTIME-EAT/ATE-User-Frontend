import React, { FC, useState } from "react";

export interface SquareIconProps {
    className?: string;
    colorClass?: string;
    isClicked?: boolean;
}

const SquareIcon: FC<SquareIconProps> = ({
    className = "",
    colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
    isClicked = false,
}) => {
    const [likedState, setLikedState] = useState(isClicked);

    return (
        <div
            className={`nc-SquareIcon w-8 h-8 flex items-center bg-black bg-opacity-30 justify-center rounded-full cursor-pointer  ${likedState ? "nc-SquareIcon--liked" : ""
                }  ${colorClass} ${className}`}
            data-nc-id="SquareIcon"
            title="Save"
            onClick={() => setLikedState(!likedState)}
        >
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill={likedState ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"

            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg> */}

            <svg xmlns="http://www.w3.org/2000/svg"
                fill={likedState ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
                />
            </svg>

        </div>
    );
};

export default SquareIcon;
