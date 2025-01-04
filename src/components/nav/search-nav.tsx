import { SearchIcon } from "lucide-react";
import { Suspense } from "react";
import { SearchInput, SearchInputPlaceholder } from "./search-input.client";

export const SearchNav = async () => {
	return (
		<label className="flex w-full items-center min-w-9 justify-end">
			<span className="sr-only">{"Seach product"}</span>
			<Suspense fallback={<SearchInputPlaceholder placeholder={"Seach product"} />}>
				<SearchInput placeholder={"Seach product"} />
			</Suspense>
			<SearchIcon className="xs:-ml-7 max-smb:cursor-pointer max-smb:z-10 block h-5 w-5" />
		</label>
	);
};