<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTinTucsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tin_tucs', function (Blueprint $table) {
            $table->id();
            $table->integer('loai_tin_id');
            $table->text('title');
            $table->text('slug')->nullable();
            $table->text('content')->nullable();
            $table->text('short_content')->nullable();
            $table->text('image');
            $table->text('image_id')->nullable();
            $table->integer('highlight')->default(0);
            $table->integer('view')->default(0)->nullable();
            $table->integer('isDanTri')->default(0)->nullable();
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
        Schema::dropIfExists('tin_tucs');
    }
}
