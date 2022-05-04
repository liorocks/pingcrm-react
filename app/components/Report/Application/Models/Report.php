<?php

namespace App\components\Report\Application\Models;
use App\components\Account\Application\Models\Account;
use App\components\Model\Application\Models\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Date;

class Report extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = "reports";

    protected $fillable = [
        'title',
        'description',
        'date'
    ];

    protected $casts = [
        'date' => 'date'
    ];

    // ------------------------------------------------------------------------
    // Getters
    // ------------------------------------------------------------------------


    /**
     * Get tilte
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * Get description
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Get date
     * @return Date
     */
    public function getDate(): Date
    {
        return $this->date;
    }

    // ------------------------------------------------------------------------
    // Setters
    // ------------------------------------------------------------------------

    /**
     * Set date of the report
     * @param Date $date
     * @return void
     */
    public function setDate(Date $date): void
    {
        $this->date = $date;
    }

    /**
     * Set the title of the report
     * @param string $title
     * @return void
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    /**
     * Set the desc of the report
     * @param string $description
     * @return void
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    // ------------------------------------------------------------------------
    // RelationShips
    // ------------------------------------------------------------------------

    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    /**
     * Create a new Factory instance for the Model
     * @return \Database\Factories\ReportFactory
     */
    protected static function newFactory()
    {
        return \Database\Factories\ReportFactory::new();
    }

    // ------------------------------------------------------------------------
    // Filters
    // ------------------------------------------------------------------------

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('title', 'like', '%'.$search.'%')
                ->orWhere('title', 'like', '%'.strtolower($search).'%')
                ->orWhere('title', 'like', '%'.strtoupper($search).'%');
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed.equalTo('with')) {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}

