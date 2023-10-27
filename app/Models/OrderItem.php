<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'menu_id',
        'jumlah',
        'subtotal',
        'harga',
    ];

    public function Menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
