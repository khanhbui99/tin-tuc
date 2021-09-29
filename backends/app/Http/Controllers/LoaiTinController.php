<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoaiTin;


class LoaiTinController extends Controller
{
    //Lấy ra tất cả loại tin
    public function index()
    {
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        //Lấy ra tất cả dữ liệu từ bảng loại tin
        $loaitins = LoaiTin::all();
        
        if (!$loaitins->isEmpty()) {
            $response['data'] = $loaitins;
            $response['message'] = '';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Không có loại tin nào!';
            $response['success'] = true;
        }
        return $response;
    }

    //Thêm mới 1 loại tin
    public function store(Request $request)
    {
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        $validator = \Validator::make($request->all(), 
        [ 
            'name' => 'required|unique:loai_tins,name',
        ]
        , 
        [
            'name.required' => 'Hãy nhập tên loại tin!',
            'name.unique' => 'Trùng tên loại tin!',
        ]);

        //Nếu mà dữ liệu truyền lên có lỗi
        if ($validator->fails()) {
            $response['message'] = $validator->messages();
        }else{

            $loaitin = new LoaiTin;
            $loaitin->name = $request->name;
            $loaitin->slug = \Str::slug($request->name, '-');
            $loaitin->save();

            $response['data'] = $loaitin;
            $response['success'] = true;
        }
        return $response;
    }

    //Hiển thị 1 loại tin theo id được truyền lên
    public function show($id)
    {
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        //Lấy ra dữ liệu loại tin từ id được truyền lên
        $data = LoaiTin::find($id);

        if ($data) {
            $response['data'] = $data;
            $response['message'] = '';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Không tồn tại!';
            $response['success'] = false;
        }
        return $response;
    }

    //Cập nhật 1 loại tin theo id được truyền lên
    public function update(Request $request, $id)
    {
        $loaitin = LoaiTin::find($id);
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        $messages = [
            'name.required' => 'Hãy nhập tên loại tin!',
            'name.unique' => 'Trùng tên loại tin!',
        ];
        $validator = \Validator::make($request->all(), [ 
            'name' => 'required|unique:loai_tins,name,'.$loaitin->id,
        ], $messages);

        if ($validator->fails()) {
            $response['message'] = $validator->messages();
        }else{

            $loaitin->name = $request->name;
            $loaitin->slug = \Str::slug($request->name, '-');
            $loaitin->update();

            $response['data'] = $loaitin;
            $response['success'] = true;
        }

        return $response;

    }

    //Xoá 1 loại tin theo id được truyền lên
    public function destroy($id)
    {
        $delete = LoaiTin::destroy($id);
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        if ($delete) {
            $response['data'] = $delete;
            $response['message'] = 'Xoá thành công!';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Xoá thất bại!';
            $response['success'] = false;
        }
        return $response;
    }
}