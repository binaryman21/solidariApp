<?php

namespace App\View\Components;

use Illuminate\View\Component;

class CardOrganizacion extends Component
{

    public string $orgname;
    public string $orgtype;
    public string $orgcover;
    public string $orgavatar;
    public string $orglocation;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($orgname, $orgtype, $orgavatar, $orgcover, $orglocation)
    {
        $this->orgname = $orgname;
        $this->orgtype = $orgtype;
        $this->orgcover = $orgcover;
        $this->orgavatar = $orgavatar;
        $this->orglocation = $orglocation;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.card-organizacion');
    }
}
