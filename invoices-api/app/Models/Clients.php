<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'adress',
        'postalCode',
        'city',
        'CIF',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    } 

    public function invoices () {
        return $this->hasMany(Invoices::class);
       }
}
