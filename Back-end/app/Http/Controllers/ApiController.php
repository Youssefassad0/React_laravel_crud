<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use App\Models\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index()
    {
        $employe = Employe::all();
        return response()->json([
            'employe' => $employe
        ], 200);
    }
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:30',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:4'
            ]);
            // Create a new user
            $employe = Employe::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password
            ]);

            // Return success response
            return response()->json([
                'message' => 'User created successfully',
                'employe' => $employe
            ], 201);
        } catch (\Exception $error) {
            // Return error response
            return response()->json([
                'message' => 'Failed to create user',
                'error' => $error->getMessage()
            ], 500);
        }
    }
    public function show($id)
    {
        $employe = Employe::find($id);
        if (!$employe) {
            return response()->json([
                'message' => 'User Not Found ! '
            ], 404);
        }
        return response()->json([
            'user' => $employe
        ], 200);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:30',
            'email' => 'required|email',
            'phone' => 'required|string',
            'age' => 'required|integer',
            'adresse' => 'required|string',
        ]);

        try {
            $employe = Employe::find($id);
            if (!$employe) {
                return response()->json([
                    'message' => 'User Not Found'
                ], 404);
            }

            $employe->name = $request->name;
            $employe->email = $request->email;
            $employe->phone = $request->phone;
            $employe->age = $request->age;
            $employe->adresse = $request->adresse;

            $employe->save();

            return response()->json([
                'message' => 'User successfully updated',
            ], 200);
        } catch (\Exception $error) {
            // Return error response
            return response()->json([
                'message' => 'Failed to update user',
                'error' => $error->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $employe = Employe::find($id);
        if (!$employe) {
            return response()->json([
                'message' => 'employe not Found '
            ], 404);
        }
        $employe->delete();
        return response()->json([
            'message' => 'User Successfuly Deleted'
        ], 200);
    }
}
