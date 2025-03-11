<?php

namespace App\Http\Controllers;

use App\Models\Invoices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class InvoicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Invoices::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

     $fields = $request->validate([
            'total' => 'required',
            'client_id' => 'required'
        ]);

      $invoice =  $request->user()->invoices()->create($fields);

        return ['invoice' => $invoice];
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoices $invoice)
    {
        return ['invoice' => $invoice];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoices $invoice)
    {
        Gate::authorize('modify', $invoice);
        $fields = $request->validate([
            'total' => 'required',
            'client_id' => 'required'
        ]);

      $invoice->update($fields);

        return ['invoice' => $invoice];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoices $invoice)
    {
        Gate::authorize('modify', $invoice);
        $invoice->delete();
        return ['message' => "The invoice was deleted"];
    }
}
