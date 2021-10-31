# 🤔 Analysis

## How would you improve this project from a code perspective?

### Refactory the routes in `web.php`

Ex:

```php
Route::get('users')->name('users')->uses('UsersController@index')->middleware('remember', 'auth');
Route::get('users/create')->name('users.create')->uses('UsersController@create')->middleware('auth');
Route::post('users')->name('users.store')->uses('UsersController@store')->middleware('auth');
Route::get('users/{user}/edit')->name('users.edit')->uses('UsersController@edit')->middleware('auth');
Route::put('users/{user}')->name('users.update')->uses('UsersController@update')->middleware('auth');
Route::delete('users/{user}')->name('users.destroy')->uses('UsersController@destroy')->middleware('auth');
Route::put('users/{user}/restore')->name('users.restore')->uses('UsersController@restore')->middleware('auth');
```

could be refactored by `resource` and `group` method which could make the code more concise and clean

```php
Route::middleware(['auth'])->group(function() {
    Route::resource('photos', PhotoController::class)->only([
        'index', 'create', 'store','edit', 'update', 'destroy'
    ]);
    Route::put('users/{user}/restore')->name('users.restore')->uses('UsersController@restore');
})

```

### Extract the `scopeFilter` function as a `Trait` Filterable

The `scopeFilter` function repeated in `Contract`, `Organisation` and `User` models and it could be useful for futur models as well. It's better to reorganise it as a `Trait` and we could use it as following:

```php
use Filterable;
private $filterFields = ['first_name', 'last_name', 'email', 'organisation.name'];

```

Besides, the `scopeFilter` function contains two different functions : filter-by-search and filter-by-trash which could be separated
as two scope functions `scopeSearch` and `scopeTrash` in order to respect the single-responsibility principal.

### Add more tests

- We had better add more integrated tests to test differents apis.
- I found Inertia testing is not sufficient as end to end test, it could not test the user behavior like 'visit', 'click'.

### Merge some identique Request

The contract and organisation store and update Request are actually the same and we could merge them currently

### Separate table seeders

All table seeders are written in DatabaseSeeder which could not seed only one table and for every futur added table we have to run again all tables.

### Need a plugin for prettier php

We can install a formatter tool for php like https://github.com/prettier/plugin-php to make sure the code style is unified.

### Unify the classic function and arrow function syntax

In the components such as `Auth/Login.js` we will find classic function writting and arrow function as follows which are better be unified.

```php
function handleSubmit(e) {}

const login = () => {}
```

### Separated icons

In the `Shared/Icon.js` use lost of condition to determin the icons and when it comes to add a new icon we have to modify the file which is not a good practice according to open close principal. We could simply creat a new folder called `Icons` and includes all the separated icon files.

## How would you improve this project from a product (features) perspective?

- Need some data such KPI and growth rate in dashboard page
- Add Id field in `Organizations`,`Contacts` and `Reports` tables for a better search
- Redirect to correspondant organization page when click the name of organization in Contacts page
- Add autocomplete function to organization selector in Contact edit/create page (ex: React Select package)
