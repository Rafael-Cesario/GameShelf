"use client";

export const LogoutButton = () => {
	const logout = async () => {
		await fetch("/api/cookies", { method: "DELETE" });
		window.location.reload();
	};

	return (
		<button data-cy="logout" className="logout" onClick={() => logout()}>
			Sair da conta
		</button>
	);
};
