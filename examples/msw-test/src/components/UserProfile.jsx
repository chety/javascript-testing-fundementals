import React, { useEffect, useState } from 'react';

export function UserProfile() {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch('/api/user')
			.then((res) => res.json())
			.then(setUser)
			.catch(setError);
	}, []);

	if (!user) return <div>Loading…</div>;
	if (error) {
		return <div>Error occured, details: {error.message}</div>
	}

	return (
		<div>
			<h1>{user.name}</h1>
		</div>
	);
}