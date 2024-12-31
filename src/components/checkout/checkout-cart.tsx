"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Address } from "@/models/order";

export const CheckoutCart = () => {
	const [loading, setLoading] = useState(false)
	const [address, setAddress] = useState<Address>({
		street: "",
		city: "",
		state: "",
		zip_code: "",
		note: "",
	})

    return (
		<section className="max-w-md pb-12">
			<Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Checkout</CardTitle>
                    <CardDescription>
                        Fill your address details to complete the order.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="street">Street</Label>
                                <Input
                                    id="street"
                                    type="text"
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    placeholder="Jakarta Selatan"
                                    required
                                />
                            </div>
							<div className="grid gap-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    type="text"
                                    value={address.state}
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                    placeholder="Jakarta"
                                    required
                                />
                            </div>
							<div className="grid gap-2">
                                <Label htmlFor="zipcode">Zip Code</Label>
                                <Input
                                    id="zipcode"
                                    type="text"
                                    value={address.zip_code}
                                    onChange={(e) => setAddress({ ...address, zip_code: e.target.value })}
                                    placeholder="Jakarta"
                                    required
                                />
                            </div>
							<div className="grid gap-2">
                                <Label htmlFor="note">Note</Label>
                                <Input
                                    id="note"
                                    type="text"
                                    value={address.note}
                                    onChange={(e) => setAddress({ ...address, note: e.target.value })}
                                    placeholder="Please call me first"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {loading ? <Loader2 className="animate-spin" /> : 'Order'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
		</section>
	);
}