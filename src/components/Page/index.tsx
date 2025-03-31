import { useState } from "react";
import { Button, Flex, Modal, Select } from "@mantine/core";
import InputComponent, { InputType } from "../Input";
import { formatNumber } from "../../utils/FormatPrice";
import { useNumberInput } from "../../hooks/useNumberInput";

const data = [
	{ value: "percentage", label: "Phần trăm" },
	{ value: "fixed", label: "Giá trị" },
] as const;
type SelectType = (typeof data)[number]["value"];

const Page = () => {
	const [opened, setOpened] = useState<boolean>(false);
	const [type, setType] = useState<SelectType>("fixed");

	const [value, onChange] = useNumberInput(0, type);

	return (
		<div className="full-page item-center">
			<div>
				<Modal
					opened={opened}
					onClose={() => void setOpened(false)}
					title="Tạo khuyến mãi"
					centered
				>
					<Flex align="flex-end" w={"100%"} gap="xs">
						<Select
							label="Giá trị giảm giá"
							placeholder="Chọn giá trị giảm giá"
							onChange={(e) => void setType(e as InputType)}
							data={data}
							value={type}
							style={{ width: "100%" }}
						/>
						<InputComponent type={type} value={value} onChange={onChange} />
					</Flex>
				</Modal>

				<Button variant="default" onClick={() => void setOpened(true)}>
					Open Modal
				</Button>

				{value > 0 && (
					<Flex mt={4}>
						Giảm giá: {formatNumber(value)} {type === "percentage" ? "%" : "đ"}
					</Flex>
				)}
			</div>
		</div>
	);
};

export default Page;
