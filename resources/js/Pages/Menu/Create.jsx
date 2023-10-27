import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";

export default function CreateMenu(props) {
    const { KategoriMenu } = usePage().props;

    {
        KategoriMenu &&
            KategoriMenu.map((data, i) => {
                console.log("DATA KATEGORI MENU:", data.nama);
            });
    }

    const { data, setData, errors, post } = useForm({
        kd_menu: "",
        nama: "",
        kategori_id: "",
        deskripsi: "",
        harga: "",
        satuan: "",
        status: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post(route("menu.store"));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create List Menu
                </h2>
            }
        >
            <Head title="Posts" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("menu.index")}
                                >
                                    Back
                                </Link>
                            </div>
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="mb-4">
                                        <label className="">Kode Menu</label>
                                        <input
                                            type="text"
                                            className="w-full  px-4 py-2"
                                            label="Kode Menu"
                                            name="kd_menu"
                                            value={data.kd_menu}
                                            onChange={(e) =>
                                                setData(
                                                    "kd_menu",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.kd_menu}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Nama</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Nama"
                                            name="nama"
                                            value={data.nama}
                                            onChange={(e) =>
                                                setData("nama", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.nama}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Kategori</label>
                                        <select
                                            className="w-full px-4 py-2"
                                            name="kategori_id"
                                            value={data.kategori_id}
                                            onChange={(e) =>
                                                setData(
                                                    "kategori_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Pilih Kategori
                                            </option>
                                            {KategoriMenu.map((kategori) => (
                                                <option
                                                    key={kategori.id}
                                                    value={kategori.id}
                                                >
                                                    {kategori.nama}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">
                                            {errors.kategori_id}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <label className="">Harga</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-2"
                                            label="Harga"
                                            name="harga"
                                            value={data.harga}
                                            onChange={(e) =>
                                                setData("harga", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.harga}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label>Satuan</label>
                                        <select
                                            className="w-full px-4 py-2"
                                            name="satuan"
                                            value={data.satuan}
                                            onChange={(e) =>
                                                setData(
                                                    "satuan",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Pilih Satuan
                                            </option>
                                            <option value="unit">Unit</option>
                                            <option value="porsi">Porsi</option>
                                            <option value="box">Box</option>
                                            <option value="pcs">Pcs</option>
                                            <option value="gelas">Gelas</option>
                                        </select>
                                        <span className="text-red-600">
                                            {errors.satuan}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block">Status</label>
                                        <select
                                            className="w-full px-4 py-2 rounded"
                                            name="status"
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Pilih Status
                                            </option>
                                            <option value="Tersedia">
                                                Tersedia
                                            </option>
                                            <option value="Tidak Tersedia">
                                                Tidak Tersedia
                                            </option>
                                        </select>
                                        <span className="text-red-600">
                                            {errors.status}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            type="text"
                                            className="w-full rounded"
                                            label="Deskripsi"
                                            name="deskripsi"
                                            value={data.deskripsi}
                                            onChange={(e) =>
                                                setData(
                                                    "deskripsi",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.deskripsi}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
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
