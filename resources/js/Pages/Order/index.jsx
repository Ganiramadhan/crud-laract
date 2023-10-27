import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";

export default function Dashboard(props) {
    const { customer } = usePage().props;
    const { orders } = usePage().props;
    const { orderItem } = usePage().props;

    const customerMap = {};
    const orderItemMap = {};
    const formatRupiah = (angka) => {
        const numberFormat = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
        return numberFormat.format(angka);
    };

    // {
    //     customer.map((data_customer, i) => {
    //         console.log("DATA CUSTOMER:", data_customer.nama);
    //     });
    // }

    // Membuat peta kategori untuk digunakan dalam tabel
    customer.forEach((customer) => {
        customerMap[customer.id] = customer.nama;
    });

    orderItem.forEach((orderItem) => {
        orderItemMap[orderItem.id] = orderItem.subtotal;
    });

    function destroy(e) {
        if (confirm("Are you sure you want to delete this product?")) {
            router.delete(route("order.destroy", e.currentTarget.id));
        }
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("order.create")}
                                >
                                    Create Order
                                </Link>
                            </div>
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-10">id</th>
                                        <th className="px-4 py-2 ">
                                            Tanggal Pesanan
                                        </th>
                                        <th className="px-4 py-2 w-20">Meja</th>
                                        <th className="px-4 py-2">Type</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Customer</th>
                                        <th className="px-4 py-2">
                                            Total Pesanan
                                        </th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders &&
                                        orders.map((item, i) => (
                                            <tr key={i}>
                                                <td className="border px-4 py-2">
                                                    {item.id}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.tanggal_pesanan}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.table_id}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.tipe}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.status}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {customerMap[
                                                        item.customer_id
                                                    ] || "Tidak ada"}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {orderItemMap[
                                                        item.order_item_id
                                                    ]
                                                        ? formatRupiah(
                                                              orderItemMap[
                                                                  item
                                                                      .order_item_id
                                                              ]
                                                          )
                                                        : "Tidak ada"}
                                                </td>

                                                <td className="border px-4 py-2">
                                                    <Link
                                                        tabIndex="1"
                                                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                        href={route(
                                                            "order.edit",
                                                            item.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={destroy}
                                                        id={item.id}
                                                        tabIndex="-1"
                                                        type="button"
                                                        className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No contacts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
