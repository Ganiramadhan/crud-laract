<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;
    protected $fillable = [
        'kd_menu',
        'nama',
        'kategori_id',
        'deskripsi',
        'harga',
        'satuan',
        'status',
    ];

    public function KategoriMenu()
    {
        return $this->belongsTo(KategoriMenu::class);
    }
}
