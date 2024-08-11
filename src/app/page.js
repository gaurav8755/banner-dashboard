'use client';

import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Dashboard from '../components/Dashboard';

export default function Home() {
    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
        async function fetchBannerData() {
            try {
                const response = await fetch('/api/banner');
                const data = await response.json();
                setBannerData(data);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        }
        fetchBannerData();
    }, []);

    const handleUpdate = async () => {
        try {
            const response = await fetch('/api/banner');
            const data = await response.json();
            setBannerData(data);
        } catch (error) {
            console.error('Error fetching updated banner data:', error);
        }
    };

    return (
        <div>
            {bannerData && <Banner data={bannerData} />}
            <Dashboard onUpdate={handleUpdate} />
        </div>
    );
}
