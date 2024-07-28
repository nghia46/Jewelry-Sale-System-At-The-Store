import HeaderMenuDropDown from './HeaderMenuDropDown';
import { IoMdSettings } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { FaGift } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa6';
import { MdHomeWork } from 'react-icons/md';
import { MdCategory } from 'react-icons/md';
import { GiGoldBar } from 'react-icons/gi';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderMenu {
    preIcon?: React.ReactNode;
    title: string;
    subMenu?: string[][];
    id: number;
    href: string;
}

const menus: HeaderMenu[] = [
    {
        title: 'Hệ thống',
        preIcon: <IoMdSettings />,
        id: 1,
        href: '',
    },
    {
        title: 'Danh mục',
        preIcon: <MdCategory />,
        id: 2,
        href: '',
    },
    {
        title: 'Kho hàng',
        preIcon: <MdHomeWork />,
        id: 3,
        href: '',
    },
    {
        title: 'Thu tiền',
        preIcon: <FaDollarSign />,
        id: 4,
        href: '',
    },
    {
        title: 'K.Mãi-VIP',
        preIcon: <FaGift />,
        id: 5,
        href: '',
    },
    {
        title: 'Doanh thu',
        preIcon: <FaFileInvoiceDollar />,
        id: 6,
        href: '',
    },
    {
        title: 'Bán hàng',
        preIcon: <FaShoppingCart />,
        id: 7,
        href: '/manager/selling',
    },
    {
        title: 'Già Vàng',
        preIcon: <GiGoldBar />,
        id: 8,
        href: '/manager/gold-price',
    },
];

const DefaultManagerLayout = ({ childen }: { childen: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state: RootState) => state.auth.user);

    console.log(user);
    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="sticky flex justify-between">
                <div className="flex gap-2">
                    {menus.map((menu) => (
                        <HeaderMenuDropDown
                            key={menu.id}
                            title={menu.title}
                            preIcon={menu.preIcon}
                            isSelect={location.pathname == menu.href}
                            onItemClick={() => {
                                navigate(menu.href);
                            }}
                        />
                    ))}
                </div>
                <div>
                    <HeaderMenuDropDown title={''} preIcon={<FaUser />} />
                </div>
            </div>
            <div className="flex flex-1 flex-col bg-gray">{childen}</div>
        </div>
    );
};

export default DefaultManagerLayout;
