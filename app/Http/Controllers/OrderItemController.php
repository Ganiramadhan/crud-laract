<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateOrderItemRequest;
use App\Models\Menu;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menu = Menu::all();
        $order_item = OrderItem::all();
        return Inertia::render('Order_item/index', ['order_item' => $order_item, 'menu' => $menu]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $menu = Menu::all();
        return Inertia::render('Order_item/Create', ['menu' => $menu]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'menu_id' => ['required'],
            'jumlah' => ['required', 'integer'], // Validasi jumlah sebagai bilangan bulat
            'subtotal' => ['required', 'numeric'], // Validasi subtotal sebagai bilangan numerik
        ]);

        // Mengonversi subtotal dari string ke float (bukan integer)
        $validatedData['subtotal'] = floatval(str_replace(['Rp', '.', ','], '', $validatedData['subtotal']));

        OrderItem::create($validatedData);

        return redirect()->route('order_item.index')->with('message', 'Data added successfully');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderItem $orderItem)
    {
        $menu = Menu::all();

        return Inertia::render('Order_item/Edit', ['orderItem' => $orderItem, 'menu' => $menu]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderItem $orderItem)
    {
        $validatedData = $request->validate([
            'menu_id' => ['required'],
            'jumlah' => ['required', 'integer'],
            'subtotal' => ['required', 'numeric'],
        ]);

        // Konversi subtotal dari format mata uang ke float
        $subtotal = floatval(str_replace(['Rp', '.', ','], '', $validatedData['subtotal']));

        // Update atribut orderItem dengan data yang divalidasi dan subtotal yang telah dikonversi
        $orderItem->update([
            'menu_id' => $validatedData['menu_id'],
            'jumlah' => $validatedData['jumlah'],
            'subtotal' => $subtotal,
        ]);

        return redirect()->route('order_item.index')->with('message', "Data successfully updated");
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderItem $orderItem)
    {
        OrderItem::findOrFail($orderItem->id)->delete();
        return redirect()->route('order_item.index')->with('message', 'Data successfully deleted');
    }
}
