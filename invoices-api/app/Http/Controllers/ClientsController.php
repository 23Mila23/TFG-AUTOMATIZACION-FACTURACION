<?php

namespace App\Http\Controllers;

use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ClientsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Clients::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'adress' => 'required|max:255',
            'postalCode' => 'required|max:255',
            'city' => 'required|max:255',
            'CIF' => 'required|max:255',
        ]);

        $client = $request->user()->clients()->create($fields);

        return ['client' => $client];
    }

    /**
     * Display the specified resource.
     */
    public function show(Clients $client)
    {
        return ['client' => $client];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Clients $client)
    {
        Gate::authorize('modify', $client);

        $fields = $request->validate([
            'name' => 'required|max:255',
            'adress' => 'required|max:255',
            'postalCode' => 'required|max:255',
            'city' => 'required|max:255',
            'CIF' => 'required|max:255',
        ]);

        $client->update($fields);

        return ['client' => $client];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clients $client)
    {
        Gate::authorize('modify', $client);
        $client->delete();

        return ['message' => 'The client was deleted'];
    }
}
