<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use mysql_xdevapi\Exception;

class ItemController extends Controller
{
    public function store(Request $request)
    {

        $data = json_decode($request->form, true);
//       info($request->all());
        $validatedData = Validator::make($data, [

            'itemname' => 'required|max:255',
            'itemprice' => 'required|decimal:2',
            'itemcode' => 'required',

        ]);
        if ($validatedData->fails()) {
            return response()->json($validatedData->errors());
        }

        $validatedData = Validator::make($request->all(), [
            'image' => 'required|image',
        ]);
        if ($validatedData->fails()) {
            return response()->json($validatedData->errors());
        }

////        info($request->all());
//        info($request->all());

        $save = new Item();

        $save->itemname = $data['itemname'];
        $save->itemprice = $data['itemprice'];
        $save->itemcode = $data['itemcode'];
        $save->image = $request->file('image')->store('item/images');

//        $this->searchByEmail($request);
//        info($save);
        $save->save();

        return redirect('ajax-form')->with('status', 'Ajax Form Data Has Been validated and store into database');

    }


    public function edit(Request $request) {

        $data = json_decode($request->form, true);
//        debug($request->all());
        $validatedData = Validator::make($data,[

            'itemname' => 'required|max:255',
            'itemprice' => 'required|decimal:2',
            'itemcode' => 'required',

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
        $update = Item::find($data['id']);

        $update->itemname = $data['itemname'];
        $update->itemprice = $data['itemprice'];
        $update->itemcode = $data['itemcode'];
        $update->image = $request->file('image')->store('item/images');
//        info($update);
//        $this->searchByEmail($request);
        $update->save();

        return redirect('ajax-form')->with('status', 'Ajax Form Data Has Been validated and store into database');

    }

    public function delete(Request $request): void
    {
        $id = $request->all()['id'];
            $deleted = new Item();
           $deleted =DB::table('Items')->where('id', $id)->delete();

    }

    public function getAll()
    {
        $item = new Item();
        $data = $item->getConnection('mysql_second')
            ->table('items')
            ->select('*')
            ->get();
        if (empty($data)) {
            return collect();
        }
        return $data;
    }

    public function getById(Request $request)
    {
        info($request->all()['id']);
        $item = new Item();
        $id = $request->all()['id'];
        if (!$item->getConnection('mysql_second')->table('items')->exists()) {
            throw new Exception('The mysql_second database connection does not exist.');
        }

        return $item->getConnection('mysql_second')
            ->table('items')
            ->where('id', $id)
            ->limit(12)
            ->get();

    }
}
