'use client';

import { useEffect, useState } from 'react';

const Banner = ({ data }) => {
    const [timeRemaining, setTimeRemaining] = useState(data.timer);
    const [endTime, setEndTime] = useState(null);
    const [shouldShowBanner, setShouldShowBanner] = useState(false);

    useEffect(() => {
        if (data.is_visible) {
            // Calculate endTime when the banner is visible and timer is set
            const newEndTime = Date.now() + (data.timer * 1000);
            setEndTime(newEndTime);
            setTimeRemaining(data.timer);
            setShouldShowBanner(true);
        } else {
            setShouldShowBanner(false);
        }
    }, [data]);

    useEffect(() => {
        if (shouldShowBanner && endTime) {
            const interval = setInterval(() => {
                const now = Date.now();
                const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
                setTimeRemaining(remaining);

                if (remaining <= 0) {
                    setShouldShowBanner(false);
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [shouldShowBanner, endTime]);

    // Hide the banner when timeRemaining is 0
    if (!shouldShowBanner) {
        return null;
    }

    return (
        <div className={`p-4 text-center bg-blue-500 text-white`}>
            <h1 className="text-2xl font-bold">{data.description}</h1>
            <p className="mt-2 text-xl">
                {timeRemaining > 0 ? `${timeRemaining} seconds remaining` : 'Time is up!'}
            </p>
            <a
                href={data.link}
                className="mt-4 inline-block px-4 py-2 bg-white text-blue-500 font-bold rounded"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn More
            </a>
        </div>
    );
};

export default Banner;
