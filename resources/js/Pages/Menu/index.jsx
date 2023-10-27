import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";

export default function Dashboard(props) {
    const [isNotif, setIsNotif] = useState(!!props.flash.message);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    const { menu } = usePage().props;
    const { KategoriMenu } = usePage().props;

    const kategoriMap = {};

    // Membuat peta kategori untuk digunakan dalam tabel
    KategoriMenu.forEach((kategori) => {
        kategoriMap[kategori.id] = kategori.nama;
    });

    function handleSearch(e) {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        setIsNotif(!!props.flash.message);
        if (isNotif) {
            const notificationTimeout = setTimeout(() => {
                setIsNotif(false);
            }, 2000);
            return () => clearTimeout(notificationTimeout);
        }
    }, [props.flash.message]);

    function destroy(e) {
        if (confirm("Apakah Anda yakin ingin menghapus Menu ini?")) {
            router.delete(route("menu.destroy", e.currentTarget.id));
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

    const filteredMenu = menu.filter((item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    List Menu
                </h2>
            }
        >
            <Head title="Menu" />
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
                                    href={route("menu.create")}
                                >
                                    Create List Menu
                                </Link>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search Menu"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <link
                                rel="stylesheet"
                                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                            />

                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Nomor</th>
                                        <th className="px-4 py-2">Kode Menu</th>
                                        <th className="px-4 py-2">Nama</th>
                                        <th className="px-4 py-2">Kategori</th>
                                        <th className="px-4 py-2">Deskripsi</th>
                                        <th className="px-4 py-2">Harga</th>
                                        <th className="px-4 py-2">Satuan</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menu &&
                                        (filteredMenu.length > 0 ? (
                                            currentItems.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="border px-4 py-2">
                                                        {item.id}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {item.kd_menu}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {item.nama}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {kategoriMap[
                                                            item.kategori_id
                                                        ] || "Tidak ada"}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {item.deskripsi}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {formatRupiah(
                                                            item.harga
                                                        )}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {item.satuan}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {item.status}
                                                    </td>
                                                    <td
                                                        className="border px-4 py-2"
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            padding: "25px",
                                                        }}
                                                    >
                                                        <Link
                                                            tabIndex="1"
                                                            className="px-3 py-2 text-sm text-white bg-blue-500 rounded"
                                                            href={route(
                                                                "menu.edit",
                                                                item.id
                                                            )}
                                                        >
                                                            <i
                                                                className="fas fa-edit"
                                                                style={{
                                                                    marginRight:
                                                                        "4px",
                                                                }}
                                                            />
                                                        </Link>
                                                        <button
                                                            onClick={destroy}
                                                            id={item.id}
                                                            tabIndex="-1"
                                                            type="button"
                                                            className="mx-1 px-3 py-2 text-sm text-white bg-red-500 rounded"
                                                        >
                                                            <i
                                                                className="fas fa-trash"
                                                                style={{
                                                                    marginRight:
                                                                        "4px",
                                                                }}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="9">
                                                    <div className="text-center text-gray-500 mt-4">
                                                        Menu Not Found.
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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
                                            : "bg-blue-500 hover:bg-blue-600"
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
                                            filteredMenu.length / itemsPerPage
                                        )
                                    }
                                    className={`join-item btn px-3 py-2 text-sm text-white rounded-md ${
                                        currentPage >=
                                        Math.ceil(
                                            filteredMenu.length / itemsPerPage
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
