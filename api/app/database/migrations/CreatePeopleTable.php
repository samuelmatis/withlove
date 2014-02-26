<?php

namespace Phirational\Withlove;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePeopleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('people', function (Blueprint $table) {

            $table->increment('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email');
            $table->string('phone');

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
		//
	}

}