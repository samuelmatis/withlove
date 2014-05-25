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
            $table->integer('order')->default('0')->after('icon_over');
            $table->renameColumn('icon_over', 'icon_pin');
        });

        DB::statement("ALTER TABLE `category` CHANGE `slug` `slug` varchar(255) COLLATE 'utf8_unicode_ci' NOT NULL AFTER `name`");
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
            $table->renameColumn('icon_pin', 'icon_over');
        });
    }

}
