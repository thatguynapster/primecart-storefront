"use client";

import { useContext } from "react";

import { StoreContext } from "@/context/store";

export const useStore = () => {
	const store = useContext(StoreContext);
	return store;
};

export default useStore;
