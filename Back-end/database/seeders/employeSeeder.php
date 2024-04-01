<?php

namespace Database\Seeders;

use App\Models\Employe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class employeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Employe::factory(30)->create();
    }
}
