<?php

use Illuminate\Database\Migrations\Migration;

class RefactorSingularModels extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('people', 'person');
        Schema::rename('places', 'place');
        Schema::rename('places_edit', 'place_edit');
        Schema::rename('users', 'user');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('person', 'people');
        Schema::rename('place', 'places');
        Schema::rename('place_edit', 'places_edit');
        Schema::rename('user', 'users');
    }
}
