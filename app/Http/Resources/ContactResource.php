<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map->only(
            'id', 'first_name', 'last_name', 'email', 'phone', 'address', 'city',
            'region', 'country', 'postal_code', 'deleted_at', 'organization_id'
        );
    }
}
