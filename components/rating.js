import React, { useState } from "react";
import style from '../styles/Component.module.css';

export default function Rating({ onChange, value }) {
    const [rating, set] = useState(value ?? 0);

    const handle = (e) => {
        set(e.target.value);
        e.target.nextSibling.querySelector('#clip-path').children[0].setAttribute('width', String(rating / 100 * 221));
    }

    return (
        <div className={style.rating}>
            <input type="range" min="1" max="100" value={rating} onChange={(e) => {
                handle(e);
                onChange(e.target.value);
            }}/>
            <svg id="stars" xmlns="http://www.w3.org/2000/svg" width="221" height="31.53" viewBox="0 0 221 31.53">
                <defs>
                    <clipPath id="clip-path">
                        <rect width="154" height="28" transform="translate(960 814)" fill="#fff"/>
                    </clipPath>
                </defs>
                <g transform="translate(-958.679 -812.236)">
                    <g>
                        <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(957.179 810.736)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1004.179 810.736)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1051.179 810.736)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1098.179 810.736)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1145.179 810.736)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                    </g>
                    <g clipPath="url(#clip-path)">
                        <g>
                            <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(957.179 810.736)" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                            <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1004.179 810.736)" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                            <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1051.179 810.736)" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                            <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1098.179 810.736)" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                            <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1145.179 810.736)" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    )
}
