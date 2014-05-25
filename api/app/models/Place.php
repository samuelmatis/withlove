<?php
namespace Phirational\Withlove\Models;

use Eloquent;

/**
 * Place
 *
 * @property integer $id
 * @property string $name
 * @property integer $category
 * @property string $description
 * @property float $latitude
 * @property float $longitude
 * @property string $web
 * @property string $street
 * @property string $zip
 * @property string $town
 * @property string $email
 * @property string $tags
 * @property string $phone
 * @property string $country
 * @property string $parent
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Place extends Eloquent
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'place';
}
