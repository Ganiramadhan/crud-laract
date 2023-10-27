import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";

export default function OrderItem(props) {
    const [isNotif, setIsNotif] = useState(!!props.flash.message);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const { order_item } = usePage().props;
    const { menu } = usePage().props;

    const menuMap = {};
    const menuMapHarga = {};

    menu.forEach((menu) => {
        menuMap[menu.id] = menu.nama;
        menuMapHarga[menu.id] = menu.harga;
    });

    function destroy(e) {
        if (confirm("Are you sure you want to delete this product?")) {
            router.delete(route("order_item.destroy", e.currentTarget.id));
        }
    }

    const formatRupiah = (angka) => {
        const numberFormat = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
        return numberFormat.format(angka);
    };

    useEffect(() => {
        setIsNotif(!!props.flash.message);
        if (isNotif) {
            const notificationTimeout = setTimeout(() => {
                setIsNotif(false);
            }, 2000);
            return () => clearTimeout(notificationTimeout);
        }
    }, [props.flash.message]);

    // Fungsi untuk melakukan pencarian
    const filteredItems = order_item.filter((item) =>
        menuMap[item.menu_id].toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hitung indeks item yang akan ditampilkan berdasarkan halaman dan item per halaman
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // Menghitung jumlah halaman yang tersedia
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Order Items
                </h2>
            }
        >
            <Head title="Order Item" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isNotif && (
                        <div className="alert alert-info mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{props.flash.message}</span>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("order_item.create")}
                                >
                                    Create Order
                                </Link>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search Order"
                                    className="w-full px-3 py-2 border rounded"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">
                                            Nomor
                                        </th>
                                        <th className="px-4 py-2">Menu</th>
                                        <th className="px-4 py-2">
                                            Harga Item
                                        </th>
                                        <th className="px-4 py-2 w-20">
                                            Jumlah
                                        </th>
                                        <th className="px-4 py-2">Subtotal</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, i) => (
                                        <tr key={i}>
                                            <td className="border px-4 py-2">
                                                {item.id}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {menuMap[item.menu_id] ||
                                                    "Tidak ada"}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {menuMapHarga[item.menu_id]
                                                    ? formatRupiah(
                                                          menuMapHarga[
                                                              item.menu_id
                                                          ]
                                                      )
                                                    : "Tidak ada"}
                                            </td>

                                            <td className="border px-4 py-2 text-center">
                                                {item.jumlah}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {formatRupiah(item.subtotal)}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route(
                                                        "order_item.edit",
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
                                    {currentItems.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="6"
                                            >
                                                No Order Item found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="join mt-8">
                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className={`join-item btn px-3 py-2 text-sm text-white rounded-md ${
                                        currentPage === 1
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-blue-500 hover-bg-blue-600"
                                    }`}
                                >
                                    Prev
                                </button>
                                <button className="join-item btn bg-blue-600 text-white hover:bg-blue-600">
                                    {currentPage}
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                    disabled={
                                        currentPage >=
                                        Math.ceil(
                                            filteredItems.length / itemsPerPage
                                        )
                                    }
                                    className={`join-item btn px-3 py-2 text-sm text-white rounded-md ${
                                        currentPage >=
                                        Math.ceil(
                                            filteredItems.length / itemsPerPage
                                        )
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
