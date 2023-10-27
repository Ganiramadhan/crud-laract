import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";

export default function Dashboard(props) {
    const { customer } = usePage().props;
    const { data, setData, put, errors } = useForm({
        nama: customer.nama || "",
        alamat: customer.alamat || "",
        no_telepon: customer.no_telepon || "",
        email: customer.email || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("customer.update", customer.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Customer
                </h2>
            }
        >
            <Head title="Customer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("customer.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">
                                            Nama Customer
                                        </label>
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

                                    <div className="mb-0">
                                        <label className="">
                                            Nomor Telepon
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded"
                                            label="Nomor Telepon"
                                            name="no_telepon"
                                            errors={errors.no_telepon}
                                            value={data.no_telepon}
                                            onChange={(e) =>
                                                setData(
                                                    "no_telepon",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.no_telepon}
                                        </span>
                                    </div>
                                    <div className="mb-0">
                                        <label className="">Email</label>
                                        <input
                                            type="text"
                                            className="w-full rounded"
                                            label="Email"
                                            name="email"
                                            errors={errors.email}
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.email}
                                        </span>
                                    </div>
                                    <div className="mb-0">
                                        <label className="">Alamat</label>
                                        <textarea
                                            type="text"
                                            className="w-full rounded"
                                            label="Alamat"
                                            name="alamat"
                                            errors={errors.alamat}
                                            value={data.alamat}
                                            onChange={(e) =>
                                                setData(
                                                    "alamat",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.alamat}
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
