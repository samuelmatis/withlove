<?php

namespace Phirational\Withlove;

class UsersSeeder extends Seeder
{
    public function run()
    {
        User::create(array(
            'email' => 'withlove@withlove.sk',
            'password' => Hash::make('guestpassword'),
            'firstname' => 'Withlove',
            'lastname' => 'Guest',
            'street' => 'Trojicne namestie 4',
            'zip' => '901 17',
            'town' => 'Trnava',
            'role' => 100
        ));

        User::create(array(
            'email' => 'admin@withlove.sk',
            'password' => Hash::make('testpassword'),
            'firstname' => 'Withlove',
            'lastname' => 'Admin',
            'street' => 'Trojicne namestie 4',
            'zip' => '901 17',
            'town' => 'Trnava',
            'role' => 500
        ));
    }
}
