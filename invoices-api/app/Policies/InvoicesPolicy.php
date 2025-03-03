<?php

namespace App\Policies;

use App\Models\Invoices;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class InvoicesPolicy
{
    public function modify(User $user, Invoices $invoice): Response
    {
        return $user->id === $invoice->user_id ? Response::allow() : Response::deny('You did not create this invoice');
    }
}
