import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";

export default function CreateOrderItem(props) {
    const { menu } = usePage().props;

    const { data, setData, errors, post } = useForm({
        menu_id: "",
        jumlah: "",
        harga: 0,
        subtotal: 0,
    });

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

        // Mengonversi `subtotal` ke angka biasa dan mengirimkannya ke server
        const subtotalNumber = parseFloat(data.subtotal);
        data.subtotal = subtotalNumber;

        post(route("order_item.store"));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            user={props.auth.user}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Order Items
                </h2>
            }
        >
            <Head title="Create Order Items" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("order_item.index")}
                                >
                                    Back
                                </Link>
                            </div>
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
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

                                    <div className="mb-2">
                                        <label className="">Jumlah</label>
                                        <input
                                            type="number"
                                            className="w-full rounded"
                                            label="Jumlah"
                                            name="jumlah"
                                            value={data.jumlah}
                                            onChange={(e) => {
                                                setData(
                                                    "jumlah",
                                                    e.target.value
                                                );
                                                calculateSubtotal(); // Menghitung subtotal saat Jumlah berubah
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
