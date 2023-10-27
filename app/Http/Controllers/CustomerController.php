<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Illuminate\Support\Facades\Validator;




class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $customers = Customer::all();
        return Inertia::render('Customer/index', ['customers' => $customers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customer/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        Validator::make($request->all(), [
            'nama' => ['required'],
            'alamat' => ['required'],
            'no_telepon' => ['required'],
            'email' => ['required'],
        ])->validate();

        Customer::create($request->all());

        return redirect()->route('customer.index')->with('message', 'Data added successfully');
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
    public function edit(Customer $customer)
    {
        return Inertia::render('Customer/Edit', [
            'customer' => $customer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        Customer::find($customer->id)->update($request->all());
        return redirect()->route('customer.index')->with('message', "Data successfully updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        Customer::findOrFail($customer->id)->delete();
        return redirect()->route('customer.index')->with('message', 'Data successfully deleted');
    }
}
