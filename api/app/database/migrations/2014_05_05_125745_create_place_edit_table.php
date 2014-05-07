<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlaceEditTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('places_edit', function (Blueprint $table) {

            $table->increments('id');
            $table->string('name');
            $table->integer('category');
            $table->integer('original');
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
            $table->string('country');
            $table->string('parent');
            $table->enum('status', array('new', 'updated'));

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
		Schema::drop('places_edit');
	}

}