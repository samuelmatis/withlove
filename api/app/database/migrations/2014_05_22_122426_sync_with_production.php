<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SyncWithProduction extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            /** @var Illuminate\Database\Schema\Blueprint $table */
            $table->string('api_token')->nullable()->after('role');
        });

        Schema::table('category', function (Blueprint $table) {
            /** @var Illuminate\Database\Schema\Blueprint $table */
            $table->integer('order')->default('0')->after('slug');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            /** @var Illuminate\Database\Schema\Blueprint $table */
            $table->dropColumn('api_token');
        });

        Schema::table('category', function (Blueprint $table) {
            /** @var Illuminate\Database\Schema\Blueprint $table */
            $table->dropColumn('order');
        });
    }

}
