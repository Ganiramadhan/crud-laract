<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Models\kategori_menu;
use App\Models\KategoriMenu;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $KategoriMenu = KategoriMenu::all();

        $menu = Menu::all();
        // dd($KategoriMenu);

        return Inertia::render('Menu/index', ['menu' => $menu, 'KategoriMenu' => $KategoriMenu]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $KategoriMenu = KategoriMenu::all();

        return Inertia::render('Menu/Create', ['KategoriMenu' => $KategoriMenu]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMenuRequest $request)
    {
        Validator::make($request->all(), [
            'kd_menu' => ['required'],
            'nama' => ['required'],
            'kategori_id' => ['required'],
            'deskripsi' => ['required'],
            'harga' => ['required'],
            'satuan' => ['required'],
            'status' => ['required'],
        ])->validate();

        Menu::create($request->all());

        return redirect()->route('menu.index')->with('message', 'Data added successfully');
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
    public function edit(Menu $menu)
    {
        $KategoriMenu = KategoriMenu::all();

        return Inertia::render('Menu/Edit', ['menu' => $menu, 'KategoriMenu' => $KategoriMenu]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMenuRequest $request, Menu $menu)
    {
        Menu::find($menu->id)->update($request->all());
        return redirect()->route('menu.index')->with('message', "Data successfully updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        Menu::findOrFail($menu->id)->delete();
        return redirect()->route('menu.index')->with('message', 'Data successfully deleted');
    }
}
