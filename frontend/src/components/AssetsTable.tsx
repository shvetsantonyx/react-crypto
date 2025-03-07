import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useCrypto } from '../context/crypto-context';

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    amount: number;
}

export const AssetsTable = () => {
    const { assets } = useCrypto();

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
            filters: assets.map((asset) => ({
                text: asset.name,
                value: asset.id,
            })),

            // [

            // {
            //     text: 'Joe',
            //     value: 'Joe',
            // },
            // {
            //     text: 'Jim',
            //     value: 'Jim',
            // },
            // {
            //     text: 'Submenu',
            //     value: 'Submenu',
            //     children: [
            //         {
            //             text: 'Green',
            //             value: 'Green',
            //         },
            //         {
            //             text: 'Black',
            //             value: 'Black',
            //         },
            //     ],
            // },
            // ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) =>
                record.name.indexOf(value as string) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Price, $',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
        },
    ];

    const data = assets.map((asset) => ({
        key: asset.id,
        name: asset.name,
        price: asset.price,
        amount: asset.amount,
    }));

    const onChange: TableProps<DataType>['onChange'] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Table<DataType>
            pagination={false}
            columns={columns}
            dataSource={data}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    );
};
