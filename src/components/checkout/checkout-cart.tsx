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

export const CheckoutCart = () => {
	const [street, setStreet] = useState("")
	const [city, setCity] = useState("")
	const [state, setState] = useState("")
	const [zipCode, setZipCode] = useState("")
	const [note, setNote] = useState("")
	const [loading, setLoading] = useState(false)

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
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Jakarta Selatan"
                                    required
                                />
                            </div>
							<div className="grid gap-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder="Jakarta"
                                    required
                                />
                            </div>
							<div className="grid gap-2">
                                <Label htmlFor="zipcode">Zip Code</Label>
                                <Input
                                    id="zipcode"
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="Jakarta"
                                    required
                                />
                            </div>
							<div className="grid gap-2">
                                <Label htmlFor="note">Note</Label>
                                <Input
                                    id="note"
                                    type="text"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
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