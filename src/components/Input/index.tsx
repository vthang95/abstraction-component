import { Flex, NumberInput } from "@mantine/core";

const INPUT_TYPE = {
	percentage: "percentage",
	fixed: "fixed",
} as const;

export type InputType = keyof typeof INPUT_TYPE;

interface IProps {
	type: InputType;
	value: number;
	onChange: (value: number) => void;
	separator?: string;
}

const InputComponent = (props: IProps) => {
	const { type, value, separator = "," } = props;
	const inputProps =
		type === "percentage"
			? {
					allowNegative: false,
					min: 0,
					max: 100,
				}
			: {};

	return (
		<Flex w={"100%"}>
			<NumberInput
				leftSection={type === "fixed" && "đ"}
				rightSection={type === "percentage" ? "%" : " "}
				thousandSeparator={separator}
				value={value}
				allowLeadingZeros={false}
				onChange={(e) => void props.onChange(Number(e))}
				{...inputProps}
			/>
		</Flex>
	);
};

export default InputComponent;
