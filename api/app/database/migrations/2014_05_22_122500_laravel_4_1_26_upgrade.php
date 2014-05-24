<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Phirational\Withlove\Models;

class Laravel4126Upgrade extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            /** @var Illuminate\Database\Schema\Blueprint $table */
            $table->string('remember_token')->nullable()->after('api_token');
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
            $table->dropColumn('remember_token');
        });
    }
}
