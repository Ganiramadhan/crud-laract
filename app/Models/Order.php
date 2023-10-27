<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    use HasFactory;
    protected $fillable = [
        'tanggal_pesanan',
        'table_id',
        'tipe',
        'status',
        'customer_id',
        'order_item_id',
    ];

    public function Customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function OrderItem()
    {
        return $this->belongsTo(OrderItem::class);
    }
}
