import { useEffect, useState } from "react";
import { Button, Flex, Modal, Select } from "@mantine/core";
import InputComponent, { Type, TypeProps } from "../Input";
import { formatNumber } from "../../utils/FormatPrice";

const Page = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [type, setType] = useState<TypeProps>(Type.FIXED);
  const [value, setValue] = useState<number>(0);

  const selectLabel = {
    percentage: "Phần trăm",
    fixed: "Giá trị",
  };

  const operator = {
    percentage: "%",
    fixed: "đ",
  };

  useEffect(() => {
    if (type === Type.PERCENTAGE) {
      Number(value) > 100 && setValue(100);
    }
  }, [value]);

  const onChangeValue = (e: number) => {
    setValue(e);
  };

  return (
    <div className="full-page item-center">
      <div>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          title="Tạo khuyến mãi"
          centered
        >
          <Flex align="flex-end" w={"100%"} gap="xs">
            <Select
              label="Giá trị giảm giá"
              placeholder="Chọn giá trị giảm giá"
              onChange={(e) => {
                if (e === Type.PERCENTAGE) {
                  Number(value) > 100 && setValue(100);
                }
                setType(e as TypeProps);
              }}
              data={[
                { value: Type.PERCENTAGE, label: selectLabel.percentage },
                { value: Type.FIXED, label: selectLabel.fixed },
              ]}
              value={type}
              style={{ width: "100%" }}
            />
            <InputComponent
              type={type}
              value={value}
              onChangeValue={onChangeValue}
            />
          </Flex>
        </Modal>

        <Button
          variant="default"
          onClick={() => {
            setOpened(true);
          }}
        >
          Open Modal
        </Button>

        {value > 0 && (
          <Flex mt={4}>
            Giảm giá: {formatNumber(value)} {operator[type]}
          </Flex>
        )}
      </div>
    </div>
  );
};

export default Page;
