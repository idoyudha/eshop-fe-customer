import CarImage from "@/images/cx60.jpg";
import MotorImage from "@/images/xsr155.jpg";

export const config = {
	categories: [
		{ name: "Car", slug: "car", image: CarImage },
		{ name: "Motor", slug: "motor", image: MotorImage },
	],

	social: {
		x: "https://x.com/eshop",
		facebook: "https://facebook.com/eshop",
	},

	contact: {
		email: "support@eshop.com",
		phone: "+1 (222) 333-3333",
		address: "123 Store Street, City, Country",
	},
};

export type StoreConfig = typeof config;
export default config;