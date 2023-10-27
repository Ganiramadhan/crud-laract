import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";

export default function EditOrderItem(props) {
    const { menu } = usePage().props;
    const { orderItem } = usePage().props;

    // Membuat objek `data` dengan nilai awal berdasarkan `orderItem`
    const { data, setData, put, errors } = useForm({
        menu_id: orderItem.menu_id || "",
        jumlah: orderItem.jumlah || "",
        subtotal: orderItem.subtotal || "",
        harga: orderItem.harga || "",
    });

    // Fungsi untuk menghitung harga dan subtotal berdasarkan perubahan menu dan jumlah
    function calculateSubtotal() {
        const selectedMenu = menu.find(
            (menuItem) => menuItem.id == data.menu_id
        );
        const jumlah = parseInt(data.jumlah) || 0;
        const harga = selectedMenu ? selectedMenu.harga : 0;
        const subtotal = jumlah * harga;
        data.subtotal = subtotal; // Mengisi data.subtotal dengan nilai subtotal yang dihitung
    }

    function handleSubmit(e) {
        e.preventDefault();
        calculateSubtotal(); // Memanggil fungsi perhitungan sebelum menyimpan

        put(route("order_item.update", orderItem.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit OrderItem
                </h2>
            }
        >
            <Head title="Edit Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("order_item.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="mb-4">
                                        <label className="">Menu</label>
                                        <select
                                            className="w-full px-4 py-2"
                                            name="menu_id"
                                            value={data.menu_id}
                                            onChange={(e) =>
                                                setData(
                                                    "menu_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Pilih Menu</option>
                                            {menu.map((menuItem) => (
                                                <option
                                                    key={menuItem.id}
                                                    value={menuItem.id}
                                                >
                                                    {menuItem.nama}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.menu_id}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <label className="">Harga</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            name="harga"
                                            value={new Intl.NumberFormat(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }
                                            ).format(
                                                menu.find(
                                                    (menuItem) =>
                                                        menuItem.id ==
                                                        data.menu_id
                                                )?.harga || 0
                                            )}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block">Jumlah</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Jumlah"
                                            name="jumlah"
                                            value={data.jumlah}
                                            onChange={(e) => {
                                                setData(
                                                    "jumlah",
                                                    e.target.value
                                                );
                                                updateMenuAndSubtotal(); // Perbarui harga dan subtotal saat mengubah jumlah
                                            }}
                                        />
                                        <span className="text-red-600">
                                            {errors.jumlah}
                                        </span>
                                    </div>

                                    <div className="mb-2 mt-2">
                                        <label className="">Subtotal</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            name="subtotal"
                                            value={new Intl.NumberFormat(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }
                                            ).format(data.subtotal)}
                                            readOnly
                                        />
                                        <span className="text-red-600">
                                            {errors.subtotal}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
