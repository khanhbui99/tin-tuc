<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Covid;
use App\Models\CovidUpdate;
use App\Http\Controllers\printValues;
use Storage;

class CovidController extends Controller
{
    //Hiển thị danh sách covid-19
    public function index() {
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        //Lấy ra lần cập nhật covid gần nhất
        $covid_update = CovidUpdate::orderBy('id', 'desc')->first();
        
        //Lấy ra dữ liệu của lần cập nhật covid gần nhất
        $covids = Covid::where('update_id', '=', $covid_update->id)->get();

        //Kiểm tra $covids có rỗng hay không
        if (!$covids->isEmpty()) {
            $response['data'] = $covids;
            $response['message'] = 'Lấy dữ liệu thành công!';
            $response['success'] = true;
        } else {
            $response['data'] = '';
            $response['message'] = 'Không có dữ liệu!';
            $response['success'] = true;
        }
        //Trả về $response sau khi hoàn tất
        return $response;
    }

    //Cập nhật lại danh sách covid-19
    public function store(Request $request) {
        $response = array('success'=>false, 'message' => '', 'data'=> '');

        //Lấy dữ liệu từ API qua Http::get
        $api_covid = Http::get('https://corona.lmao.ninja/v2/countries');
        
        //Giải mã dữ liệu json vừa lấy thành 1 mảng
        $api_covid = json_decode($api_covid, true);

        //Kiểm tra xem $api_covid có dữ liệu hay không
        if ($api_covid) {
            //Insert 1 dòng dữ liệu mới vào trong bảng covid_update database
            $covidupdate = new CovidUpdate;
            $covidupdate->save();

            foreach ($api_covid as $item) {

                $covid = new Covid;
                $covid->update_id = $covidupdate->id;
                $covid->country = $item["country"];
    
                $covid->iso2 = $item["countryInfo"]["iso2"];
                $covid->image = $item["countryInfo"]["flag"];
    
                $covid->cases = $item["cases"];
                $covid->todayCases = $item["todayCases"];
                $covid->deaths = $item["deaths"];
                $covid->todayDeaths = $item["todayDeaths"];
                $covid->recovered = $item["recovered"];
                $covid->todayRecovered = $item["todayRecovered"];
                $covid->save();
            }
    
            $response['message'] = 'Thành công!';
            $response['success'] = true;
        } else {
            $response['message'] = 'Lấy dữ liệu thất bại';
        }

        return $response;
    }

}