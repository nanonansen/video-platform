import React from "react";

const Icon = ({ name, color }) => {
    switch (name) {
        case "search":
            return (
                <svg
                    height="16"
                    width="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill={color}>
                        <path
                            d="M12.7,11.3c0.9-1.2,1.4-2.6,1.4-4.2C14.1,3.2,11,0,7.1,0S0,3.2,0,7.1c0,3.9,3.2,7.1,7.1,7.1 c1.6,0,3.1-0.5,4.2-1.4l3,3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L12.7,11.3z M7.1,12.1 C4.3,12.1,2,9.9,2,7.1S4.3,2,7.1,2s5.1,2.3,5.1,5.1S9.9,12.1,7.1,12.1z"
                            fill={color}
                        />
                    </g>
                </svg>
            );
        case "menu":
            return (
                <svg
                    height="16"
                    width="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill={color}>
                        <circle cx="8" cy="8" r="2" />
                        <circle cx="2" cy="8" fill={color} r="2" />
                        <circle cx="14" cy="8" fill={color} r="2" />
                    </g>
                </svg>
            );
        case "play":
            return (
                <svg
                    height="16"
                    width="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill={color}>
                        <path
                            d="M14,7.999c0-0.326-0.159-0.632-0.427-0.819l-10-7C3.269-0.034,2.869-0.058,2.538,0.112 C2.207,0.285,2,0.626,2,0.999v14.001c0,0.373,0.207,0.715,0.538,0.887c0.331,0.17,0.73,0.146,1.035-0.068l10-7 C13.841,8.633,14,8.327,14,8.001C14,8,14,8,14,7.999C14,8,14,8,14,7.999z"
                            fill={color}
                        />
                    </g>
                </svg>
            );
        default:
            return null;
    }
};

export default Icon;
