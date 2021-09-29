<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CovidUpdate extends Model
{
    use HasFactory;

    protected $table = 'covid_updates';
    protected $fillable = [
    ];
    
    public function covid() {
        return $this->hasMany('App\Models\Covid','update_id');
    }
}