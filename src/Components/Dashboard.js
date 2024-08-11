'use client';

import { useState, useEffect } from 'react';

const Dashboard = ({ onUpdate }) => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState('');
    const [link, setLink] = useState('');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        async function fetchBannerData() {
            try {
                const response = await fetch('/api/banner');
                const data = await response.json();
                setDescription(data.description || '');
                setTimer(data.timer || '');
                setLink(data.link || '');
                setIsVisible(data.is_visible ?? true);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        }
        fetchBannerData();
    }, []);

    const handleUpdate = async () => {
        try {
            const response = await fetch('/api/update-banner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, timer, link, isVisible }),
            });

            if (response.ok) {
                alert('Banner updated successfully!');
                // Call the onUpdate function passed from the Home component
                onUpdate();
            } else {
                alert('Failed to update banner.');
            }
        } catch (error) {
            console.error('Error updating banner:', error);
            alert('Error updating banner.');
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Update Banner</h2>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Timer (seconds):</label>
                <input
                    type="number"
                    value={timer}
                    onChange={(e) => setTimer(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Link:</label>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={(e) => setIsVisible(e.target.checked)}
                        className="mr-2"
                    />
                    Visible
                </label>
            </div>
            <button
                onClick={handleUpdate}
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded"
            >
                Update Banner
            </button>
        </div>
    );
};

export default Dashboard;
