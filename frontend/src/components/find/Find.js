import React, { useState } from 'react';
import api from '../../api/axiosConfig';
const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <h1>find List</h1>
            </header>
            <main>{children}</main>
        </div>
    );
};

const Find = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        const response = await api.get(`/api/v1/movies/like/${searchQuery}`);

        // 在这里执行搜索逻辑，获取结果并更新 searchResults 状态
        // 这里只是一个示例
        const results = response.data
        setSearchResults(results);
    };

    return (
        <Layout>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Trailer</th>
                    <th>Poster</th>
                </tr>
                </thead>
                <tbody>
                {searchResults.map((result, index) => (
                    <tr key={index}>
                        <td>{result.title}</td>
                        <td>
                            <a href={result.trailerLink}>Watch Trailer</a>
                        </td>
                        <td>
                            <img className="poster-image" src={result.poster} alt={result.title} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default Find;