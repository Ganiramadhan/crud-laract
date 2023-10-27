<?php

namespace App\Http\Controllers;

use App\Models\KategoriMenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class KategoriMenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategori_menu = KategoriMenu::all();
        return Inertia::render('Kategori_menu/index', ['kategori_menu' => $kategori_menu]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kategori_menu/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        KategoriMenu::create($request->all());

        return redirect()->route('kategori_menu.index');
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
    public function edit(KategoriMenu $kategori_menu)
    {
        return Inertia::render('Kategori_menu/Edit', [
            'kategori_menu' => $kategori_menu
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KategoriMenu $kategori_menu)
    {
        KategoriMenu::find($kategori_menu->id)->update($request->all());
        return redirect()->route('kategori_menu.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KategoriMenu $kategori_menu)
    {
        KategoriMenu::findOrFail($kategori_menu->id)->delete();
        return redirect()->route('kategori_menu.index');
    }
}