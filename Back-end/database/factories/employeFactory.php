<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\employe>
 */
class employeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' =>  fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'age' => fake()->numberBetween(18, 70),
            'date-naissance' => fake()->date(),
            'adresse' => fake()->address()
        ];
    }
}
