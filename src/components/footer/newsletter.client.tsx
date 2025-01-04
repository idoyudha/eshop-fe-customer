"use client";

import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { signForNewsletter } from "./action";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const Newsletter = () => {
	const [loading, setLoading] = useState(false);
    const { toast } = useToast()
	return (
		<form
			className="flex gap-x-2"
			onSubmit={() => {
				setLoading(true);
			}}
			action={async (formData) => {
				try {
					const result = await signForNewsletter(formData);
					if (result?.status && result.status < 400) {
						toast({
                            description: "success",
                        })
					} else {
						toast({
                            description: "error",
                        })
					}
				} catch (error) {
					toast({
                        description: "error",
                    })
				} finally {
					setLoading(false);
				}
			}}
		>
			<Input
				className="max-w-lg flex-1"
				placeholder={"email"}
				type="email"
				name="email"
				required
			/>
			<Button type="submit" className="w-24 rounded-full" variant="default" disabled={loading}>
				{loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "Subscribe"}
			</Button>
		</form>
	);
};