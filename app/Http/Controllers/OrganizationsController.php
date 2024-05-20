<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationStoreRequest;
use App\Http\Requests\OrganizationUpdateRequest;
use App\Http\Resources\OrganizationCollection;
use App\Http\Resources\OrganizationResource;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Organizations/Index', [
            'filters' => Request::all('search', 'trashed'),
            'organizations' => new OrganizationCollection(
                Auth::user()->account->organizations()
                    ->orderBy('name')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Organizations/Create');
    }

    public function store(OrganizationStoreRequest $request): RedirectResponse
    {
        Auth::user()->account->organizations()->create(
            $request->validated()
        );

        return Redirect::route('organizations')->with('success', 'Organization created.');
    }

    public function edit(Organization $organization): Response
    {
        return Inertia::render('Organizations/Edit', [
            'organization' => new OrganizationResource($organization),
        ]);
    }

    public function update(Organization $organization, OrganizationUpdateRequest $request): RedirectResponse
    {
        $organization->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Organization updated.');
    }

    public function destroy(Organization $organization): RedirectResponse
    {
        $organization->delete();

        return Redirect::back()->with('success', 'Organization deleted.');
    }

    public function restore(Organization $organization): RedirectResponse
    {
        $organization->restore();

        return Redirect::back()->with('success', 'Organization restored.');
    }
}
