import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
// import React, { useState } from "react";

export default function Dashboard(props) {
    console.log("MY PROPS:", props);
    // const [isNotif, setIsNotif] = useState(false);

    const { data, setData, errors, post } = useForm({
        nama: "",
        alamat: "",
        no_telepon: "",
        email: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        // setIsNotif(true);
        post(route("customer.store"));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Customer
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
                                            label="Name"
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
                                            type="email"
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
