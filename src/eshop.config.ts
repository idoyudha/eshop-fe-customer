import CarImage from "@/images/cx60.jpg";
import MotorImage from "@/images/xsr155.jpg";

export const config = {
	categories: [
		{ name: "Car", slug: "car", category_id: "0193ec82-749f-7ad6-b194-65eaf0de698f", image: CarImage },
		{ name: "Motor", slug: "motor", category_id: "0193ec82-892a-7ebd-89e9-5500bfb5a634", image: MotorImage },
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