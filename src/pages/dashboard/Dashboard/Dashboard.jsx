import React from "react";

const Dashboard = () => {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				<div className="bg-white rounded-lg shadow p-4">📋 Site Health Status</div>
				<div className="bg-white rounded-lg shadow p-4">📊 At a Glance</div>
				<div className="bg-white rounded-lg shadow p-4">📈 Activity</div>
			</div>
			<div className="bg-white rounded-lg shadow p-4">📝 Yoast SEO Overview</div>
		</div>
	);
};

export default Dashboard;
