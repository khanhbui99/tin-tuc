<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoaiTin extends Model
{
    use HasFactory;

    protected $table = 'loai_tins';
    protected $fillable = [
        'name',
        'slug',
    ];

    public function tin_tucs() {
        return $this->hasMany('App\Models\TinTuc','loai_tin_id');
    }
}