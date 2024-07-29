import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Headeritems = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

    const header_list = [
        {
          title: 'Movies',
          link: '/'
        },
        {
          title: 'Tv-series',
          link: '/tv-series'
        },
        {
          title: 'About-us',
          link: '/about'
        },
        {
          title: 'Contact-us',
          link: '/contact'
        },
    ];

    useEffect(() => {
        const handlemousemove = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', handlemousemove);

        return () => window.removeEventListener('mousemove', handlemousemove);
    }, []);

    useEffect(() => {
        const navitems = document.querySelectorAll('.navitems');
        navitems.forEach((i) => {
            const rect = i.getBoundingClientRect();

            if (
                position.x >= rect.left &&
                position.x <= rect.right &&
                position.y >= rect.top &&
                position.y <= rect.bottom
            ) {
                setTargetPosition({
                    x: rect.left - 430,
                    y: rect.top -5,
                    width: rect.width ,
                    height: rect.height-4,
                });
            }
        });
    }, [position]);

    const mouseeffect = {
        position: 'fixed',
        width: `${targetPosition.width}px`,
        height: `${targetPosition.height}px`,
        backgroundColor: '#313030',
        borderRadius: '4px',
        transform: `translate(${targetPosition.x}px, ${targetPosition.y}px)`,
        transition: 'transform 0.3s ease, width 0.3s ease, height 0.3s ease', // Smooth transition
        pointerEvents: 'none',
        zIndex: -1, // Ensure it appears behind the nav items
    };

    return (
        <>
            <div className="hidden sm:flex ml-[400px] fixed">
                <div style={mouseeffect} ></div>

                {header_list.map((item, index) => (
                    <Link to={item.link} key={index}>
                        <h1 className='p-2 text-gray-400 m-4 navitems relative'>
                            {item.title}
                        </h1>
                    </Link>
                ))}
            </div>
        </>
    );
};


