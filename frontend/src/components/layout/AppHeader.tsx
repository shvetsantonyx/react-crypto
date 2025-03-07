import { useEffect, useState } from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { CryptoInfoModal } from '../CryptoInfoModal';
import { CryptoResultType } from '../../types';
import { AddAssetForm } from '../AddAssetForm';

const headerStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const AppHeader = () => {
    const [select, setSelect] = useState(false);
    const [coin, setCoin] = useState<CryptoResultType>();
    const [modal, setModal] = useState(false);
    const [drawer, setDrawer] = useState(false);

    const { crypto } = useCrypto();

    useEffect(() => {
        const keypress = (event: KeyboardEvent) => {
            if (event.key === '/') {
                setSelect((prev) => !prev);
            }
        };
        document.addEventListener('keypress', keypress);
        return () => removeEventListener('keypress', keypress);
    }, []);

    const handleSelect = (value: string) => {
        setCoin(crypto.find((c) => c!.id === value));
        setModal((prev) => !prev);
    };

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{ width: 250 }}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value="press / to open"
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

            <Button type="primary" onClick={() => setDrawer(true)}>
                Add Asset
            </Button>

            <Modal
                open={modal}
                onOk={() => setModal(false)}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <CryptoInfoModal coin={coin} />
            </Modal>

            <Drawer
                width={600}
                title="Add Asset"
                onClose={() => setDrawer(false)}
                open={drawer}
                destroyOnClose
            >
                <AddAssetForm onClose={() => setDrawer(false)} />
            </Drawer>
        </Layout.Header>
    );
};
