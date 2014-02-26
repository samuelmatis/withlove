<?php

namespace Phirational\Withlove;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('places', function (Blueprint $table) {

            $table->increments('id');
            $table->string('name');
            $table->int('category');
            $table->string('description');
            $table->float('latitude');
            $table->float('longitude');
            $table->string('web');
            $table->string('street');
            $table->string('zip');
            $table->string('town');
            $table->string('email');
            $table->string('tags');
            $table->string('phone');
            $table->string('tags');
            $table->string('country');
            $table->string('parent');

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
        Schema::drop('places');
    }
}
