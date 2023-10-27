import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";

export default function EditMenu(props) {
    const { KategoriMenu } = usePage().props;

    {
        KategoriMenu.map((data, i) => {
            console.log("DATA SAYA:", data.nama);
        });
    }

    const { menu } = usePage().props;
    const { data, setData, put, errors } = useForm({
        kd_menu: menu.kd_menu || "",
        nama: menu.nama || "",
        deskripsi: menu.deskripsi || "",
        harga: menu.harga || "",
        satuan: menu.satuan || "",
        status: menu.status || "",
        kategori_id: menu.kategori_id || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("menu.update", menu.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Daftar Menu
                </h2>
            }
        >
            <Head title="Edit Menu" />

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
                                        <label className="block">
                                            Kode Menu
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
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
                                        <label className="block">Nama</label>
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
                                        <label className="block">Harga</label>
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
                                        <label className="block">Satuan</label>
                                        <select
                                            className="w-full rounded"
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
                                </div>
                                <div className="mb-4">
                                    <label className="block">Deskripsi</label>
                                    <textarea
                                        type="text"
                                        className="w-full px-4 py-2"
                                        label="Deskripsi"
                                        name="deskripsi"
                                        value={data.deskripsi}
                                        onChange={(e) =>
                                            setData("deskripsi", e.target.value)
                                        }
                                    />
                                    <span className="text-red-600">
                                        {errors.deskripsi}
                                    </span>
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
