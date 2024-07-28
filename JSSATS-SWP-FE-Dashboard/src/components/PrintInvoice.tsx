import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { RootState } from '../store';
import { formatNumber, formatVNDate } from '../utils/formater';
import logo from '../assets/logo.png';

interface PrintInvoiceProps {
    isPrint: boolean;
}

const PrintInvoice = ({ isPrint }: PrintInvoiceProps) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const bill = useSelector((state: RootState) => state.bill.showBill.bill);

    useEffect(() => {
        if (isPrint) {
            handlePrint();
        }
    }, [isPrint]);

    return (
        <div className="w-full">
            <div ref={componentRef}>
                <div className="py-4">
                    <div className="px-14 py-6">
                        <table className="w-full border-collapse border-spacing-0">
                            <tbody>
                                <tr>
                                    <td className="w-full align-top">
                                        <div>
                                            <img src={logo} className="h-16" alt="Logo" />
                                        </div>
                                    </td>
                                    <td className="align-top">
                                        <div className="text-sm">
                                            <table className="border-collapse border-spacing-0">
                                                <tbody>
                                                    <tr>
                                                        <td className="border-r pr-4">
                                                            <div>
                                                                <p className="whitespace-nowrap text-right text-slate-400">
                                                                    Date
                                                                </p>
                                                                <p className="text-main whitespace-nowrap text-right font-bold text-purple">
                                                                    {formatVNDate(
                                                                        new Date(bill.saleDate),
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="pl-4">
                                                            <div>
                                                                <p className="whitespace-nowrap text-right text-slate-400">
                                                                    Invoice #
                                                                </p>
                                                                <p className="text-main whitespace-nowrap text-right font-bold text-purple">
                                                                    {bill.billId}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-100 px-14 py-6 text-sm">
                        <table className="w-full border-collapse border-spacing-0">
                            <tbody>
                                <tr>
                                    <td className="w-1/2 align-top">
                                        <div className="text-sm text-neutral-600">
                                            <p className="font-bold">Liceria & Co.</p>
                                            <p>Number: 23456789</p>
                                            <p>VAT: 23456789</p>
                                            <p>6622 Abshire Mills</p>
                                            <p>Port Orlofurt, 05820</p>
                                            <p>United States</p>
                                        </div>
                                    </td>
                                    <td className="w-1/2 text-right align-top">
                                        <div className="text-sm text-neutral-600">
                                            <p className="font-bold">Khách hàng</p>
                                            <p>Họ Tên: {bill.customerName}</p>
                                            <p>VAT: 23456789</p>
                                            <p>9552 Vandervort Spurs</p>
                                            <p>Paradise, 43325</p>
                                            <p>United States</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="px-14 py-10 text-sm text-neutral-700">
                        <table className="w-full border-collapse border-spacing-0">
                            <thead>
                                <tr className="text-purple">
                                    <td className="border-main text-main border-b-2 pb-3 pl-3 font-bold">
                                        #
                                    </td>
                                    <td className="border-main text-main border-b-2 pb-3 pl-2 font-bold">
                                        Sản Phẩm
                                    </td>
                                    <td className="border-main text-main border-b-2 pb-3 pl-2 text-center font-bold">
                                        Mã
                                    </td>
                                    <td className="border-main text-main border-b-2 pb-3 pl-2 text-center font-bold">
                                        Giá
                                    </td>
                                    <td className="border-main text-main border-b-2 pb-3 pl-2 pr-3 text-right font-bold">
                                        Thành Tiền
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {bill.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-b py-3 pl-3">{index + 1}</td>
                                        <td className="border-b py-3 pl-2">{item.name}</td>
                                        <td className="border-b py-3 pl-2 text-center">
                                            {item.jewelryId}
                                        </td>
                                        <td className="border-b py-3 pl-2 text-center">
                                            {formatNumber(item.totalPrice.toFixed(2)) + ' VND'}
                                        </td>
                                        <td className="border-b py-3 pl-2 pr-3 text-right">
                                            {formatNumber(item.totalPrice.toFixed(2)) + ' VND'}
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan={7}>
                                        <table className="w-full border-collapse border-spacing-0">
                                            <tbody>
                                                <tr>
                                                    <td className="w-full"></td>
                                                    <td>
                                                        <table className="w-full border-collapse border-spacing-0">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="border-b p-3">
                                                                        <div className="whitespace-nowrap text-slate-400">
                                                                            Tổng Giá:
                                                                        </div>
                                                                    </td>
                                                                    <td className="border-b p-3 text-right">
                                                                        <div className="text-main whitespace-nowrap font-bold text-purple">
                                                                            {formatNumber(
                                                                                bill.totalAmount.toFixed(
                                                                                    2,
                                                                                ),
                                                                            ) + ' VND'}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="p-3">
                                                                        <div className="whitespace-nowrap text-slate-400">
                                                                            Khuyến Mãi
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-3 text-right">
                                                                        <div className="text-main whitespace-nowrap font-bold text-purple">
                                                                            {formatNumber(
                                                                                (
                                                                                    bill.totalDiscount *
                                                                                    0.01 *
                                                                                    bill.totalAmount
                                                                                ).toFixed(2),
                                                                            ) + ' VND'}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr className="bg-purple">
                                                                    <td className="bg-main p-3">
                                                                        <div className="whitespace-nowrap font-bold text-white">
                                                                            Phải Trả
                                                                        </div>
                                                                    </td>
                                                                    <td className="bg-main p-3 text-right">
                                                                        <div className="whitespace-nowrap font-bold text-white">
                                                                            {formatNumber(
                                                                                bill.finalAmount.toFixed(
                                                                                    2,
                                                                                ),
                                                                            ) + ' VND'}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="px-14 text-sm text-neutral-700">
                        <p className="text-main font-bold text-purple">PAYMENT DETAILS</p>
                        <p>Banks of Banks</p>
                        <p>Bank/Sort Code: 1234567</p>
                        <p>Account Number: 123456678</p>
                        <p>Payment Reference: BRA-00335</p>
                    </div>

                    <div className="px-14 py-10 text-sm text-neutral-700">
                        <p className="text-main font-bold text-purple">Notes</p>
                        <p className="italic">
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and
                            publishing industries for previewing layouts and visual mockups.
                        </p>
                    </div>

                    <footer className="bg-slate-100 py-3 text-center text-xs text-[#525252]">
                        <div>© 2024 Liceria & Co. All rights reserved.</div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default PrintInvoice;
