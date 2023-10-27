import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";

export default function Dashboard(props) {
    // State untuk notifikasi
    const [isNotif, setIsNotif] = useState(!!props.flash.message);
    // Mendapatkan data pelanggan dari props
    const { customers } = usePage().props;
    // State untuk pencarian pelanggan
    const [searchTerm, setSearchTerm] = useState("");
    // State untuk menampilkan pesan jika hasil pencarian kosong
    const [noResults, setNoResults] = useState(false);
    // State untuk halaman saat ini
    const [currentPage, setCurrentPage] = useState(1);
    // Jumlah item per halaman
    const itemsPerPage = 5;

    useEffect(() => {
        setIsNotif(!!props.flash.message);
        if (isNotif) {
            const notificationTimeout = setTimeout(() => {
                setIsNotif(false);
            }, 3000); // 2 detik

            return () => clearTimeout(notificationTimeout);
        }
    }, [props.flash.message]);

    function destroy(e) {
        if (confirm("Apakah Anda yakin ingin menghapus Menu ini?")) {
            router.delete(route("customer.destroy", e.currentTarget.id));
        }
    }

    // Filter pelanggan berdasarkan kata kunci pencarian
    const filteredCustomers = customers.filter((item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        // Menampilkan pesan jika hasil pencarian kosong
        setNoResults(filteredCustomers.length === 0);
    }, [searchTerm, customers]);

    // Paginasi
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    // Total halaman
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    // Fungsi untuk mengubah halaman
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Customers
                </h2>
            }
        >
            <Head title="Customers" />
            <div className="py-6">
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
                                <link
                                    rel="stylesheet"
                                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                                />
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("customer.create")}
                                >
                                    Create Customer
                                </Link>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search Customer"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            {currentItems.length > 0 ? (
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 w-20">
                                                Nomor
                                            </th>
                                            <th className="py-2">Nama</th>
                                            <th className="px-4 py-2">
                                                Alamat
                                            </th>
                                            <th className="px-4 py-2">
                                                Nomor Telepon
                                            </th>
                                            <th className="px-4 py-2">Email</th>
                                            <th className="px-4 py-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, i) => (
                                            <tr key={i}>
                                                <td className="border px-4 py-2">
                                                    {item.id}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.nama}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.alamat}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.no_telepon}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    {item.email}
                                                </td>
                                                <td
                                                    className="border px-4 py-2"
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        padding: "25px",
                                                    }}
                                                >
                                                    <Link
                                                        tabIndex="1"
                                                        className="px-3 py-2 text-sm text-white bg-blue-500 rounded"
                                                        href={route(
                                                            "customer.edit",
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
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center text-gray-500 mt-4">
                                    No customers found.
                                </div>
                            )}
                            <div className="join mt-8 ">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
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
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={` join-item btn px-3 py-2 text-sm text-white rounded-md ${
                                        currentPage === totalPages
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
