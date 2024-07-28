import MenuItem from '../../components/MenuItem';
import { FaFolderOpen } from 'react-icons/fa6';
import { IoIosSave } from 'react-icons/io';
import { IoIosPrint } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import billApi from '../../services/billsApi';
import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { CreateBillRequest } from '../../types/bill.type';
import { PiUserGearFill } from 'react-icons/pi';
import InputCustomerModal from '../../components/InputCustomerModal';
import { setShowCustomerModal } from '../../slices/customerSlice';
import { message } from 'antd';
import CheckoutModel from '../../components/CheckoutModel';
import ShowBillModel from '../../components/ShowBillModel';
import { setShowBill } from '../../slices/billSlice';

const colors = ['bg-[#21a6de]', 'bg-[#df21a7]', 'bg-[#de5921]', 'bg-[#20de58]', 'bg-[#745da1]'];
type Options = 'payment' | 'printBill' | 'customerInfo';
interface RightOptions {
    icon: React.ReactNode;
    title: string;
    color: string;
    id: Options;
}

const rightOptions: RightOptions[] = [
    {
        icon: <PiUserGearFill size={24} />,
        title: 'Thông tin khách hàng',
        color: colors[2],
        id: 'customerInfo',
    },
    {
        icon: <IoIosSave size={24} />,
        title: 'Thanh toán',
        color: colors[0],
        id: 'payment',
    },
    {
        icon: <IoIosPrint size={24} />,
        title: 'In hóa đơn',
        color: colors[1],
        id: 'printBill',
    },
];

const SellingPageFooter = () => {
    const dispatch = useDispatch();
    const tempBill = useSelector((state: RootState) => state.jewelry.bill);
    const cart = useSelector((state: RootState) => state.jewelry.cart);
    const user = useSelector((state: RootState) => state.auth.user);
    const customerId = useSelector((state: RootState) => state.customer.customer.customerId);
    const [showCheckout, setshowCheckout] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    //------------------------ handle call api create bills ----------------------//

    const [CreateBill, { isLoading, isSuccess, data, isError, error }] =
        billApi.useCreateBillMutation();

    useEffect(() => {
        if (isSuccess && data) {
            setshowCheckout(true);
            dispatch(setShowBill({ bill: data, isShow: false }));
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError) {
            console.log(error);
        }
    }, [isError]);

    //------------------------ end handle call api create bills ----------------------//

    const handleBtnClick = (options: Options) => {
        switch (options) {
            case 'payment':
                if (customerId.length > 0) {
                    console.log(tempBill);
                    if (cart.length > 0) {
                        const d: CreateBillRequest = {
                            ...tempBill,
                            userId: user.userId,
                            counterId: '1',
                            jewelries: cart.map((cart) => ({ jewelryId: cart.id })),
                            customerId: customerId,
                        };
                        console.log(d);

                        CreateBill(d);
                    } else {
                        messageApi.open({
                            type: 'warning',
                            content: 'Không có sản phẩm nào để thanh toán',
                        });
                    }
                } else {
                    dispatch(setShowCustomerModal(true));
                }

                break;
            case 'printBill':
                break;
            case 'customerInfo':
                dispatch(setShowCustomerModal(true));
                break;
        }
    };

    return (
        <div>
            {contextHolder}
            <div className="flex justify-between bg-white px-2 py-1">
                <ShowBillModel />
                <div>
                    <MenuItem
                        title="Mở rộng"
                        preIcon={<FaFolderOpen size={24} />}
                        containerStyle="bg-secondary-DARK text-white rounded-md hover:bg-gray-200 hover:text-[#333]"
                        orientation="Vertical"
                        expendDirection="UP"
                        containerSelectedStyle=""
                        submenu={<div />}
                    />
                </div>
                <div className="flex gap-2">
                    <MenuItem
                        key={rightOptions[0].id}
                        title={rightOptions[0].title}
                        preIcon={rightOptions[0].icon}
                        orientation="Vertical"
                        onItemClick={() => handleBtnClick(rightOptions[0].id)}
                        containerStyle={
                            ' text-white rounded-md hover:bg-gray-200 hover:text-[#333] ' +
                            rightOptions[0].color
                        }
                    />
                    <MenuItem
                        key={rightOptions[1].id}
                        title={rightOptions[1].title}
                        preIcon={rightOptions[1].icon}
                        orientation="Vertical"
                        onItemClick={() => handleBtnClick(rightOptions[1].id)}
                        isLoading={isLoading}
                        containerStyle={
                            ' text-white rounded-md hover:bg-gray-200 hover:text-[#333] ' +
                            rightOptions[1].color
                        }
                    />
                    <MenuItem
                        key={rightOptions[2].id}
                        title={rightOptions[2].title}
                        preIcon={rightOptions[2].icon}
                        orientation="Vertical"
                        onItemClick={() => handleBtnClick(rightOptions[2].id)}
                        containerStyle={
                            ' text-white rounded-md hover:bg-gray-200 hover:text-[#333] ' +
                            rightOptions[2].color
                        }
                    />
                </div>
            </div>
            <InputCustomerModal title="Thông tin khách hàng" />
            <CheckoutModel open={showCheckout} setOpen={setshowCheckout} />
            {/* <CustomModel
                open={true}
                body={
                    <Result
                        status="success"
                        title="Lưu hóa đơn thành công!"
                        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                        extra={[
                            <div className="flex justify-center gap-4 p-2">
                                <Button
                                    type="primary"
                                    className="rounded-sm bg-primary px-5 py-1 !text-white"
                                >
                                    In hóa đơn
                                </Button>
                                <Button
                                    type="primary"
                                    className="rounded-sm bg-secondary px-5 py-1 !text-white"
                                >
                                    Tiếp tục thanh toán
                                </Button>
                            </div>,
                        ]}
                    />
                }
            /> */}
        </div>
    );
};

export default SellingPageFooter;
