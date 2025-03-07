import { Flex, Typography } from 'antd';
import { CryptoResultType } from '../types';

export const CoinUnfo = ({
    coin,
    withSymbol,
}: {
    coin: CryptoResultType;
    withSymbol?: boolean;
}) => {
    return (
        <Flex align="center">
            <img
                src={coin?.icon}
                alt={coin?.name}
                width={40}
                style={{ marginRight: 10 }}
            />
            <Typography.Title level={2} style={{ margin: 0 }}>
                {withSymbol && <span>({coin.symbol})</span>} {coin?.name}
            </Typography.Title>
        </Flex>
    );
};
