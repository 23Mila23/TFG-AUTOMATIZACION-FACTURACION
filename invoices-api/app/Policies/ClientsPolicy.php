<?php

namespace App\Policies;

use App\Models\Clients;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ClientsPolicy
{
   
    public function modify(User $user, Clients $client): Response
    {
        return $user->id === $client->user_id ? Response::allow() : Response::deny('You do not own this post');
    }
}
