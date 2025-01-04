export async function signForNewsletter(formData: FormData) {
    const email = formData.get("email");
	if (typeof email !== "string" || !email?.includes("@")) {
		return;
	}
    const result = await fetch("http://google.com", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	});
	const json = await result.json();
	return json as {
		status: number;
	};
}