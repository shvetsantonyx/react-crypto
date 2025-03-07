import { useRef, useState } from 'react';
import {
    Select,
    Space,
    Divider,
    Form,
    InputNumber,
    Button,
    DatePicker,
    Result,
} from 'antd';
import { useCrypto } from '../context/crypto-context';
import { Asset, CryptoResultType } from '../api';
import { CoinUnfo } from './CoinInfo';

export type FieldType = {
    amount: number;
    price: number;
    total: number;
    date: any;
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not valid number',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export const AddAssetForm = ({ onClose }: { onClose: () => void }) => {
    const [form] = Form.useForm();
    const { crypto, addAsset } = useCrypto();
    const [coin, setCoin] = useState<CryptoResultType>();
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef<Asset>(null);

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current?.amount} of ${coin?.name} by price ${assetRef.current?.price}`}
                extra={[
                    <Button type="primary" key="close" onClick={onClose}>
                        Close
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                ]}
            />
        );
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                placeholder="Select coin"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            width={20}
                            src={option.data.icon}
                            alt={option.data.label}
                        />
                        {option.data.label}
                    </Space>
                )}
            />
        );
    }

    const onFinish = (values: FieldType) => {
        console.log(values);
        const newAsset: Asset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        };
        assetRef.current = newAsset;
        setSubmitted(true);
        addAsset(newAsset);
    };

    const handleAmountChange = (value: number | null) => {
        const price = form.getFieldValue('price');
        form.setFieldValue('total', +(value! * price).toFixed(2));
    };

    const handlePriceChange = (value: number | null) => {
        const amount = form.getFieldValue('amount');
        form.setFieldValue('total', +(value! * amount).toFixed(2));
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            style={{ maxWidth: 600 }}
            initialValues={{ price: +coin.price.toFixed(2) }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <CoinUnfo coin={coin} />
            <Divider />

            <Form.Item<FieldType>
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber
                    placeholder="Enter coin amount"
                    onChange={handleAmountChange}
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item<FieldType> label="Price" name="price">
                <InputNumber
                    onChange={handlePriceChange}
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item<FieldType> label="Date & Time" name="date">
                <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item<FieldType> label="Total" name="total">
                <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    );
};
