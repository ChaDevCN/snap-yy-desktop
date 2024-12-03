import React from "react";
import { Button, Card, Form, Input, InputNumber, Row, Col } from "antd";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useComponents, useUI } from "@/store";
import { Divider } from "@/components/base";
import { Component } from "@/types";

interface FormValues {
    min: number;
    randomCount: number;
    max: number;
    randomTimes: number;
}
const layout = {
    labelCol: { span: 15 },
    wrapperCol: { span: 15 },
};

const { Search } = Input;
const Setting = () => {
    const defaultValues = {
        min: 1,
        randomCount: 4,
        max: 4,
        randomTimes: 1,
    };
    const { resetSplitterSize } = useUI((state) => state);
    const [form] = Form.useForm();
    const [randomResults, setRandomResults] = React.useState<number[][]>([]);
    const { addComponents } = useComponents();
    const [alternate, setAlternate] = React.useState<Component>({
        id: uuidv4(),
        text: "",
        name: "text",
        pId: null,
        tag: 1,
    });
    const { updateCard, cards } = useComponents();
    const [currentTime, setCurrentTime] = React.useState(
        dayjs().format("YYYY-MM-DD HH:mm:ss")
    );

    const validatePositiveNumber = (_, value: number) => {
        if (value <= 0) {
            return Promise.reject(new Error("请输入大于0的正整数"));
        }
        return Promise.resolve();
    };

    const generateUniqueRandomNumbers = (
        min: number,
        max: number,
        count: number
    ): number[] => {
        const uniqueNumbers = new Set<number>();
        while (uniqueNumbers.size < count) {
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            uniqueNumbers.add(randomNum);
        }
        return Array.from(uniqueNumbers);
    };
    const onFinish = (values: FormValues) => {
        const { min, randomCount, max, randomTimes } = values;
        const randomResults = [];
        for (let i = 0; i < randomTimes; i++) {
            randomResults.push(generateUniqueRandomNumbers(min, max, randomCount));
        }
        setRandomResults(randomResults);
    };
    const handleClear = () => {
        setRandomResults([]);
        form.resetFields();
    };
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const handleAddHallCard = () => {
        updateCard({
            id: uuidv4(),
            tag: "hall",
            title: `${cards.length + 1} 厅`,
        });
    };
    const onSearch = (value: string) => {
        if (!value) return;
        addComponents({
            ...alternate,
            text: value,
        });
        setAlternate((state) => ({
            ...state,
            text: "",
            id: uuidv4(),
        }));
    };
    const hallCardLength = cards.filter((s) => s.tag === "hall").length;
    return (
        <div className="w-[300px] h-full border-l-1 border-gray-200">
            <Divider title="设置" />
            <div className="mx-10 space-y-3">
                <Search
                    placeholder="请输入补位人员ID"
                    enterButton="添加补位"
                    size="middle"
                    onSearch={onSearch}
                    value={alternate.text}
                    onChange={(e) => {
                        setAlternate((state) => ({ ...state, text: e.target.value }));
                    }}
                />
                <Button onClick={resetSplitterSize} className="w-full" type="primary">
                    队长图
                </Button>
                <Button
                    type="primary"
                    className="w-full"
                    onClick={handleAddHallCard}
                    disabled={hallCardLength > 100}
                >
                    添加厅
                </Button>
            </div>

            <div className="mt-10 mx-4">
                <Divider title="随机数字区" borderColor="#7cb305" />
                <Card className="!h-fit w-full">
                    <p>{currentTime}</p>
                    <div>
                        {randomResults.length > 0 ? (
                            randomResults.map((result, index) => (
                                <div key={index}>
                                    <ul className="flex gap-2 text-xl font-bold">
                                        {result.map((num, idx) => (
                                            <li key={idx}>{num}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>暂无随机次数的结果</p>
                        )}
                    </div>
                </Card>
                <div className="mt-10">
                    <Form
                        {...layout}
                        initialValues={defaultValues}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="最小值"
                                    name="min"
                                    rules={[
                                        { required: true, message: "最小值为必填项" },
                                        { validator: validatePositiveNumber },
                                    ]}
                                >
                                    <InputNumber className="!w-15" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="最大值"
                                    name="max"
                                    rules={[
                                        { required: true, message: "最大值为必填项" },
                                        { validator: validatePositiveNumber },
                                    ]}
                                >
                                    <InputNumber className="!w-15" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="随机个数"
                                    name="randomCount"
                                    rules={[
                                        { required: true, message: "随机个数为必填项" },
                                        { validator: validatePositiveNumber },
                                    ]}
                                >
                                    <InputNumber className="!w-15" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="randomTimes"
                                    label="随机次数"
                                    rules={[
                                        { required: true, message: "随机次数为必填项" },
                                        { validator: validatePositiveNumber },
                                    ]}
                                >
                                    <InputNumber className="!w-15" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className="flex items-center justify-between gap-2">
                            <Form.Item>
                                <Button className="w-[130px]" type="primary" htmlType="submit">
                                    生成
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    className="w-[130px]"
                                    htmlType="button"
                                    onClick={handleClear}
                                >
                                    清空
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
export default Setting;
