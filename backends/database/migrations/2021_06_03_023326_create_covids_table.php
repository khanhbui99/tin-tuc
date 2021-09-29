<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCovidsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('covids', function (Blueprint $table) {
            $table->id();
            $table->integer('update_id')->default(1);
            $table->string('country');
            $table->string('iso2')->nullable();
            $table->text('image')->nullable();
            $table->integer('cases')->default(0);
            $table->integer('todayCases')->default(0);
            $table->integer('deaths')->default(0);
            $table->integer('todayDeaths')->default(0);
            $table->integer('recovered')->default(0);
            $table->integer('todayRecovered')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('covids');
    }
}
