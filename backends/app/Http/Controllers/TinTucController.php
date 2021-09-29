<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoaiTin;
use App\Models\TinTuc;

class TinTucController extends Controller
{
    public function index()
    {
        $response = array('success'=>false, 'message' => '', 'data'=> '');
        $tintucs = TinTuc::orderBy('id','desc') -> get();
        // $tintucs = TinTuc::all();

        if (!$tintucs->isEmpty()) {
            $response['data'] = $tintucs;
            $response['message'] = '';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Không có tin tức nào!';
            $response['success'] = true;
        }
        return $response;
    }

    public function store(Request $request)
    {
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        $messages = [
            'title.required' => 'Hãy nhập tên tiêu đề bài viết!',
            'title.unique' => 'Trùng tên tiêu đề bài viết!',
            'content.required' => 'Hãy nhập nội dung bài viết!',
            'loai_tin_id.required' => 'Hãy chọn thể loại bài viết!',
            'image.required' => 'Ảnh không được để trống!',
        ];

        $validator = \Validator::make($request->all(), [ 
            'title' => 'required|unique:tin_tucs,title',
            'content' => 'required',
            'loai_tin_id' => 'required',
            'image' => 'required',
        ], $messages);
        if ($validator->fails()) {
            $response['message'] = $validator->messages();
        }else{
            $tintuc = new TinTuc();
            $tintuc->title = $request->title;
            $tintuc->slug = \Str::slug($request->title, '-');
            $tintuc->loai_tin_id = $request->loai_tin_id;
            $tintuc->content = $request->content;
            $tintuc->short_content = $request->short_content;
            $tintuc->author = $request->author;
            $tintuc->image = $request->image;
            $tintuc->highlight = $request->highlight;
            $tintuc->save();
            $response['message'] = "Thêm bài viết mới thành công!";
            $response['data'] = $tintuc;
            $response['success'] = true;
        }
        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $response = array('success'=>false, 'message' => '', 'data'=> '');
        $data = TinTuc::find($id);
        if ($data) {
            $response['data'] = $data;
            $response['message'] = '';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Bài viết không tồn tại!';
            $response['success'] = false;
        }
        return $response;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $tintuc = TinTuc::find($id);
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        $messages = [
            'title.required' => 'Hãy nhập tên tiêu đề bài viết!',
            'title.unique' => 'Trùng tên tiêu đề bài viết!',
            'content.required' => 'Hãy nhập nội dung bài viết!',
            'loai_tin_id.required' => 'Hãy chọn thể loại bài viết!',
        ];
        $validator = \Validator::make($request->all(), [ 
            'title' => 'required|unique:tin_tucs,title,'.$tintuc->id,
            'content' => 'required',
            'loai_tin_id' => 'required',

        ], $messages);
        if ($validator->fails()) {
            $response['message'] = $validator->messages();
        }else{
            $tintuc->title = $request->title;
            $tintuc->slug = \Str::slug($request->title, '-');
            $tintuc->loai_tin_id = $request->loai_tin_id;
            $tintuc->content = $request->content;
            $tintuc->short_content = $request->short_content;
            $tintuc->author = $request->author;
            $tintuc->image = $request->image;
            $tintuc->highlight = $request->highlight;
            $tintuc->update();

            $response['data'] = $tintuc;
            $response['message'] = "Cập nhật thành công!";
            $response['success'] = true;
        }
        return $response;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $tintuc = TinTuc::find($id);
        $delete_storage = \Storage::disk('google')->delete($tintuc->image_id);

        $delete = TinTuc::destroy($id);
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

    /**
     * Search for a title in table loai_tins.
     *
     * @param  str  $title
     * @return \Illuminate\Http\Response
     */
    //Tìm kiếm tin tức
    public function search($title)
    {
        //
        $search = TinTuc::where('title', 'like', '%'.$title.'%')->orderBy('id', 'desc')->get();

        $response = array('success'=>false, 'message' => '', 'data'=> '');

        if (!$search->isEmpty()) {
            $response['data'] = $search;
            $response['message'] = '';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Không tìm thấy tin tức';
            $response['success'] = false;
        }

        return $response;
    }

    public function highlight() {
        $response = array('success'=>false, 'message' => '', 'data'=> '');
        $tintucs = TinTuc::all();

        $noibat = TinTuc::where('highlight', '=', 1)->get();
        $xemnhieu = TinTuc::orderBy('view', 'desc')->take(10)->get();

        $data['noibat'] = $noibat;
        $data['xemnhieu'] = $xemnhieu;
        $data['all'] = $tintucs;

        if (!$tintucs->isEmpty()) {
            $response['data'] = $data;
            $response['message'] = '';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Không có tin tức nào!';
            $response['success'] = false;
        }
        return $response;
    }

    public function new_tt() {
        $response = array('success'=>false, 'message' => '', 'data'=> '');
        $now = \Carbon\Carbon::now();

        $new = TinTuc::orderBy('updated_at', 'desc')->take(10)->get();

        if (!$new->isEmpty()) {
            $response['data'] = $new;
            $response['message'] = '';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Không có tin tức nào!';
            $response['success'] = true;
        }
        return $response;
    }

    public function loaitin($id) {
        $response = array('success'=>false, 'message' => '', 'data'=> '');
        $tintucs = TinTuc::where('loai_tin_id', '=', $id)->orderBy('id','desc')->get();

        if (!$tintucs->isEmpty()) {
            $response['data'] = $tintucs;
            $response['message'] = '';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Không có tin tức nào!';
            $response['success'] = true;
        }
        return $response;
    }

    public function view($id) {
        $response = array('success'=>false, 'message' => '', 'data'=> '');
        $tintuc = TinTuc::find($id);

        if ($tintuc) {
            $tintuc->view += 1;
            $tintuc->save();
            $response['data'] = $tintuc;
            $response['message'] = '';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Không tồn tại tin túc này!';
            $response['success'] = false;
        }
        return $response;
    }
    
    public function uploadImages(Request $request){
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        $files = [];

        $messages = [
            'images.*.image' => 'File tải lên không đúng định dạng!',
        ];
        $validator = \Validator::make($request->all(), [ 
            'images.*' => 'image',
        ], $messages);

        if ($validator->fails()) {
            $response['message'] = $validator->messages();
        }else{
            if ($request->hasFile('images')) {

                foreach($request->file('images') as $file) {

                    $name = $file->getClientOriginalName();
                    $hinh = \Str::random(10) . "_" . \Str::random(10) . "_" . $name;
                    
                    \Storage::disk("google")->putFileAs("/1L3rt_fvX49q0vfsUflf5Tj41o1HUuPi3",  $file, $hinh); 

                    $details = \Storage::disk('google')->getMetadata("1L3rt_fvX49q0vfsUflf5Tj41o1HUuPi3/".$hinh);
                    $url = \Storage::disk('google')->url("1L3rt_fvX49q0vfsUflf5Tj41o1HUuPi3/".$hinh);
                    $files[] = $url;
                }
            }
            $response['success'] = true;
            $response['data'] = $files;
        }

        return $response;
    }

}