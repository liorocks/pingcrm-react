<?php

namespace App\components\Organization\Application\Models;

use App\components\Contact\Application\Models\Contact;
use App\components\Model\Application\Models\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Organization extends Model
{
    use SoftDeletes, HasFactory;

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%');
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }

    /**
     * Create a new Factory instance for the Model
     * @return \Database\Factories\OrganizationFactory
     */
    protected static function newFactory()
    {
        return \Database\Factories\OrganizationFactory::new();
    }
}
