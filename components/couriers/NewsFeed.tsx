import { useState, useEffect } from 'react';

const sampleNews = [
    { id: 1, title: 'New eco-friendly packaging introduced', date: '2023-05-07' },
    { id: 2, title: 'Company expands operations to 3 new cities', date: '2023-05-06' },
    { id: 3, title: 'Customer satisfaction reaches all-time high', date: '2023-05-05' },
];

export default function NewsFeed() {
    const [news, setNews] = useState(sampleNews);

    useEffect(() => {
        // Simulating API call
        const fetchNews = () => {
            // In a real application, you would fetch news from an API here
            setNews(sampleNews);
        };

        fetchNews();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Company News</h2>
            <ul className="space-y-4">
                {news.map(item => (
                    <li key={item.id} className="border-b pb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}