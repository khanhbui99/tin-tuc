<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Covid extends Model
{
    use HasFactory;

    protected $table = 'covids';
    protected $fillable = [
        'update_id',
        'country',
        'iso2',
        'image',
        'cases',
        'todayCases',
        'deaths',
        'todayDeaths',
        'recovered',
        'todayRecovered',
    ];
    
    public function covid_update() {
        return $this->beLongsTo('App\Models\CovidUpdate','update_id');
    }
}