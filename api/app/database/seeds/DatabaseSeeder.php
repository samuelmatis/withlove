<?php

use Phirational\LaravelConditionalSeeder\ConditionalSeeder;

class DatabaseSeeder extends Seeder
{
    use ConditionalSeeder;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Eloquent::unguard();

        if ($this->isInLastMigrations('2014_05_05_125824_create_user_table')) {
            $this->call('UsersSeeder');
        }
    }
}
