<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TinTuc extends Model
{
    use HasFactory;

    protected $table = 'tin_tucs';
    protected $fillable = [
        'loai_tin_id',
        'title',
        'slug',
        'short_content',
        'content',
        'image',
        'highlight',
        'view',
    ];

    public function loai_tins() {
        return $this->beLongsTo('App\Models\LoaiTin','loai_tin_id');
    }
}