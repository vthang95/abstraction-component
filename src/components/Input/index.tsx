import { Flex, Input, NumberInput } from "@mantine/core";

export enum Type {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export type TypeProps = Type.FIXED | Type.PERCENTAGE;

interface IProps {
  type: TypeProps;
  value: number;
  onChangeValue: (value: number) => void;
}

const InputComponent = (props: IProps) => {
  const { type, value = 0, onChangeValue } = props;

  const InputView = {
    percentage: (
      <NumberInput
        rightSection={"%"}
        w={"100%"}
        value={value}
        min={0}
        max={100}
        allowNegative={false}
        onChange={(e) => {
          onChangeValue(Number(e));
        }}
      />
    ),
    fixed: (
      <NumberInput
        value={value}
        leftSection={"đ"}
        rightSection={" "}
        thousandSeparator=","
        onChange={(e) => {
          onChangeValue(Number(e));
        }}
      />
    ),
  }[type];

  return <Flex w={"100%"}>{InputView}</Flex>;
};

export default InputComponent;
