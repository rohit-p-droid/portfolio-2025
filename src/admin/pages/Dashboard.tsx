import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Admin Dashboard</h1>
            <div style={{
                display: "flex",
                gap: "2rem",
                marginTop: "2rem"
            }}>
                <div style={{
                    background: "#f5f5f5",
                    padding: "1rem",
                    borderRadius: "8px",
                    minWidth: "200px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h2>Users</h2>
                    <p>124 active users</p>
                </div>
                <div style={{
                    background: "#f5f5f5",
                    padding: "1rem",
                    borderRadius: "8px",
                    minWidth: "200px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h2>Sales</h2>
                    <p>$12,400 this month</p>
                </div>
                <div style={{
                    background: "#f5f5f5",
                    padding: "1rem",
                    borderRadius: "8px",
                    minWidth: "200px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h2>Performance</h2>
                    <p>98% uptime</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;