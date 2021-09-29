<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class loaiTinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('loai_tins')->insert([
            'name'=>'Xã hội',
            'slug'=>\Str::slug('Xã hội', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Thế giới',
            'slug'=>\Str::slug('Thế giới', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Kinh doanh',
            'slug'=>\Str::slug('Kinh doanh', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'BấT động sản',
            'slug'=>\Str::slug('Bất động sản', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Thế thao',
            'slug'=>\Str::slug('Thế thao', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Lao động việc làm',
            'slug'=>\Str::slug('Lao động việc làm', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Tấm lòng nhân ái',
            'slug'=>\Str::slug('Tấm lòng nhân ái', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Sức khoẻ',
            'slug'=>\Str::slug('Sức khoẻ', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Văn hoá',
            'slug'=>\Str::slug('Văn hoá', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Giải trí',
            'slug'=>\Str::slug('Giải trí', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Ô tô, xe máy',
            'slug'=>\Str::slug('Ô tô xe máy', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Sức mạnh số',
            'slug'=>\Str::slug('Sức mạnh số', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Giáo dục hướng nghiệp',
            'slug'=>\Str::slug('Giáo dục hướng nghiệp', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Pháp luật',
            'slug'=>\Str::slug('Pháp luật', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'Sự kiện',
            'slug'=>\Str::slug('Sự kiện', '-')
        ]);
        DB::table('loai_tins')->insert([
            'name'=>'An sinh',
            'slug'=>\Str::slug('An sinh', '-')
        ]);
    }
}
