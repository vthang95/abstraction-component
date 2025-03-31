import { useCallback, useEffect, useState } from "react";
import { InputType } from "../components/Input";

export function useNumberInput(initialValue = 0, type: InputType = "fixed") {
	const [value, setValue] = useState<number>(initialValue);

	const handleChange = useCallback(
		(newValue: number) => {
			if (type === "percentage") {
				const val = Math.min(Number(newValue), 100);
				setValue(val);
			} else {
				setValue(Number(newValue));
			}
		},
		[type],
	);

	useEffect(() => {
		if (type === "percentage" && value > 100) {
			setValue(100);
		}
	}, [type]);

	console.log("value return", value);
	return [value, handleChange] as const;
}
