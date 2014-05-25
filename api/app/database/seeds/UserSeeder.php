<?php

use Phirational\Withlove\Models\User;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $tblUser = User::getModel()->getTable();

        DB::table($tblUser)->delete();

        $users = [
            [
                'email' => 'withlove@withlove.sk',
                'password' => Hash::make('guestpassword'),
                'firstname' => 'Withlove',
                'lastname' => 'Guest',
                'street' => 'Trojicne namestie 4',
                'zip' => '901 17',
                'town' => 'Trnava',
                'role' => 100
            ],
            [
                'email' => 'admin@withlove.sk',
                'password' => Hash::make('testpassword'),
                'firstname' => 'Withlove',
                'lastname' => 'Admin',
                'street' => 'Trojicne namestie 4',
                'zip' => '901 17',
                'town' => 'Trnava',
                'role' => 500
            ]
        ];
 
        DB::table($tblUser)->insert($users);
    }
}