<?php

namespace Phirational\Withlove;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlaceParentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('place_parent', function (Blueprint $table) {

            $table->int('parent_id');
            $table->int('children_id');
            $table->enum('type', array('PLACE', 'PERSON'));

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