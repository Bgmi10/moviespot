import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import './Profile.css'; // Ensure this CSS file contains the styles

export const Githubmainprofile = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetch_data = async () => {
        try {
            const octokit = new Octokit({
                auth: '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', // Use your environment variable for the token
            });

            const reposResponse = await octokit.request('GET /user', {
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            });

            const reposData = reposResponse.data;
            setData(reposData);
            setLoading(false); // Set loading to false once data is fetched
        } catch (err) {
            console.log(err);
            setLoading(false); // Ensure loading is false even on error
        }
    };

    useEffect(() => {
        fetch_data();
    }, []);

    return (
        <div className="profile-container text-white m-4">
            {loading ? (
                <div className="spinner">Loading...</div>
            ) : (
                <div className="profile-info">
                    <div className="flipping-avatar">
                        <div className="flip-card">
                            <div className="flip-card-front">
                                <img src={data?.avatar_url} alt="Profile Avatar" className="profile-avatar" />
                            </div>
                            <div className="flip-card-back">
                                 <img src='https://img.freepik.com/free-vector/rocket-flying-moon-cartoon-vector-icon-illustration-technology-transportation-icon-isolated_138676-5157.jpg?size=626&ext=jpg&ga=GA1.1.728969476.1723797893&semt=ais_hybrid' alt="Back Side" className="back-img rounded-full "/> 
                            
                            </div>
                        </div>
                    </div>
                    <div className="profile-details">
                        <span className="name">{data?.name}</span>
                        <span className="username">@{data?.login}</span>
                        <span className="pronouns">he/him</span>
                        <p className="bio">{data?.bio}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
