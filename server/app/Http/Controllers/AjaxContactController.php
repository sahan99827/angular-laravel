<?php

namespace App\Http\Controllers;

use App\Models\System;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Exception;
use Illuminate\Support\Facades\Validator;



class AjaxContactController extends Controller
{
//    public function index(): \Illuminate\Contracts\View\View|\Illuminate\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\Foundation\Application
//    {
//        return view('ajax-contact-us-form');
//    }

    public function store(Request $request){
        $data = json_decode($request->form, true);
//        debug($request->all());
        $validatedData = Validator::make($data,[

            'firstname' => 'required|max:255',
            'lastname' => 'required|max:255',
            'email' => 'required|unique:contacts|max:255|email',
            'number' => 'required|numeric',
            'address' => 'required',
            'nic' => 'required',
            'age' =>'required|integer'


        ]);
        if ($validatedData->fails()) {
            return response()->json($validatedData->errors());
        }


        $validatedData = Validator::make($request->all(),[
            'image' => 'required|image',
        ]);
        if ($validatedData->fails()) {
            return response()->json($validatedData->errors());
        }


////        info($request->all());
//        info($request->all());


        $save = new System;

        $save->firstname = $data['firstname'];
        $save->lastname = $data['lastname'];
        $save->number = $data['number'];
        $save->address = $data['address'];
        $save->nic = $data['nic'];
        $save->age = $data['age'];
        $save->email = $data['email'];
        $save->image = $request->file('image')->store('images');

//        $this->searchByEmail($request);
//        info($save);
        $save->save();

         return redirect('ajax-form')->with('status', 'Ajax Form Data Has Been validated and store into database');


    }

    public function edit(Request $request) {

        $data = json_decode($request->form, true);
//        debug($request->all());
        $validatedData = Validator::make($data,[

            'firstname' => 'required|max:255',
            'lastname' => 'required|max:255',
            'email' => 'required|unique:contacts|max:255|email',
            'number' => 'required|numeric',
            'address' => 'required',
            'nic' => 'required',
            'age' =>'required|integer'


        ]);
        if ($validatedData->fails()) {
            return response()->json($validatedData->errors());
        }


        $validatedData = Validator::make($request->all(),[
            'image' => 'required|image',
        ]);
        if ($validatedData->fails()) {
            return response()->json($validatedData->errors());
        }

        info($data);
        $update = System::find($data['id']);

        $update->firstname = $data['firstname'];
        $update->lastname = $data['lastname'];
        $update->number = $data['number'];
        $update->address = $data['address'];
        $update->nic = $data['nic'];
        $update->age = $data['age'];
        $update->email = $data['email'];
        $update->image = $request->file('image')->store('images');
//        info($update);
//        $this->searchByEmail($request);
        $update->save();

        return redirect('ajax-form')->with('status', 'Ajax Form Data Has Been validated and store into database');


    }

    public function delete(Request $request): void
    {

        $id = $request->all()['id'];
        $deleted = new System();
        $deleted =DB::table('systems')->where('id', $id)->delete();
    }

    public function search(Request $request): \Illuminate\Support\Collection
    {
        $nic = $request->all()['nic'];
//        info($nic);
        $search = new System;

        if (!$search->getConnection('mysql_second')->table('systems')->exists()) {
            throw new Exception('The mysql_second database connection does not exist.');
        }

        $data = $search->getConnection('mysql_second')
            ->table('systems')
            ->where('nic', 'like', '%' . $nic . '%')
            ->limit(12)
            ->get();
//        info($data);
        if (empty($data)) {
            return collect();
        }else{
            info('Nic Invalid');

        }

        return $data;
    }
//    public function searchByEmail(Request $request): \Illuminate\Support\Collection
//    {
//        $val = json_decode($request->form, true);
//
//        $nic = $request->input('nic');
//        $email = $request->input('email');
////        info($nic);
//        $search = new System;
//
//        if (!$search->getConnection('mysql_second')->table('systems')->exists()) {
//            throw new Exception('The mysql_second database connection does not exist.');
//        }
//
//        $dataByEmail = $search->getConnection('mysql_second')
//            ->table('systems')
//            ->where(  'email','like','%'.$email.'%')
//            ->limit(12)
//            ->get();
//
//
//        $dataByNic = $search->getConnection('mysql_second')
//            ->table('systems')
//            ->where('nic', 'like', '%' . $nic . '%')
//            ->limit(12)
//            ->get();
//
//        info($dataByEmail);
//        info($dataByNic);
//
//        if ( empty($dataByEmail) && empty($dataByNic)) {
//            return collect();
//        }
//        else{
//            if($dataByEmail == $val['email'] && $dataByNic == $val['nic']){
//                info('Email and Nic Exit');
//            }
//        }


    //}
}


//|image|mimes:jpeg,png,jpg,gif|max:2048
//  info( $request->all());
// info($data['firstname']);
