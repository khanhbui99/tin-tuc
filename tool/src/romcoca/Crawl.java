package romcoca;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.awt.*;
import java.awt.event.KeyEvent;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Crawl {

    public Server server;
    public ArrayList<News> listNews = new ArrayList<>();

    public void startCrawl() {
        String xaHoi = "https://dantri.com.vn/xa-hoi.htm#dt_source=Home&dt_campaign=MenuMain&dt_medium=3";
        String theGioi = "https://dantri.com.vn/the-gioi.htm#dt_source=Cate_XaHoi&dt_campaign=MenuMain&dt_medium=4";
        String kinhDoanh = "https://dantri.com.vn/kinh-doanh.htm#dt_source=Cate_TheGioi&dt_campaign=MenuMain&dt_medium=5";
        String batDongSan = "https://dantri.com.vn/bat-dong-san.htm#dt_source=Cate_KinhDoanh&dt_campaign=MenuMain&dt_medium=6";
        String theThao = "https://dantri.com.vn/the-thao.htm#dt_source=Cate_BatDongSan&dt_campaign=MenuMain&dt_medium=7";
        String laoDongVieclam = "https://dantri.com.vn/lao-dong-viec-lam.htm#dt_source=Cate_TheThao&dt_campaign=MenuMain&dt_medium=8";
        String tamLongNhanAi = "https://dantri.com.vn/tam-long-nhan-ai.htm#dt_source=Cate_LaoDongViecLam&dt_campaign=MenuMain&dt_medium=9";
        String sucKhoe = "https://dantri.com.vn/suc-khoe.htm#dt_source=Cate_TamLongNhanAi&dt_campaign=MenuMain&dt_medium=10";
        String vanHoa = "https://dantri.com.vn/van-hoa.htm#dt_source=Cate_SucKhoe&dt_campaign=MenuMain&dt_medium=11";
        String giaiTri = "https://dantri.com.vn/giai-tri.htm#dt_source=Cate_VanHoa&dt_campaign=MenuMain&dt_medium=12";
        String oToXeMay = "https://dantri.com.vn/o-to-xe-may.htm#dt_source=Cate_GiaiTri&dt_campaign=MenuMain&dt_medium=13";
        String sucManhSo = "https://dantri.com.vn/suc-manh-so.htm#dt_source=Cate_OToXeMay&dt_campaign=MenuMain&dt_medium=14";
        String giaoDucHuongNghiep = "https://dantri.com.vn/giao-duc-huong-nghiep.htm#dt_source=Cate_SucManhSo&dt_campaign=MenuMain&dt_medium=15";
        String phapLuat = "https://dantri.com.vn/phap-luat.htm#dt_source=Cate_AnSinh&dt_campaign=MenuMain&dt_medium=17";

        String suKien = "https://dantri.com.vn/su-kien.htm#dt_source=Cate_TheGioi&dt_campaign=MenuMain&dt_medium=2";
        String anSinh = "https://dantri.com.vn/an-sinh.htm#dt_source=Cate_GiaoDucHuongNghiep&dt_campaign=MenuMain&dt_medium=16";

        String[][] list1 = new String[][]{
                {xaHoi, "1"},
                {theGioi, "2"},
                {kinhDoanh, "3"},
                {batDongSan, "4"},
                {theThao, "5"},
                {laoDongVieclam, "6"},
                {tamLongNhanAi, "7"},
                {sucKhoe, "8"},
                {vanHoa, "9"},
                {giaiTri, "10"},
                {oToXeMay, "11"},
                {sucManhSo, "12"},
                {giaoDucHuongNghiep, "13"},
                {phapLuat, "14"},
        };

        String[][] list2 = new String[][]{
                {suKien, "15"},
                {anSinh, "16"},
        };

            try {
                String linkNews = "";
                String title = "";
                String urlImage = "";
                String shortContent = "";

                int ik;
                for(ik = 0; ik<list1.length; ik++) {
                        Document document = Jsoup.connect(list1[ik][0]).get();
                        Elements elms = document.getElementsByClass("dt-list dt-list--lg");
                        for (int i = 0; i < elms.size(); i++) {
                            Elements elm_row = elms.get(i).getElementsByTag("li");
                            for (int j = 0; j < elm_row.size(); j++) {
                                Elements aHref = elm_row.get(j).getElementsByTag("a");
                                if(aHref.size()>0) {
                                    linkNews = aHref.first().absUrl("href");
                                    title = aHref.first().attr("title");

                                    Elements imgContent = elm_row.get(j).getElementsByClass("news-item__avatar");
                                    Elements imgElements = imgContent.first().getElementsByClass("no-img");
                                    urlImage = imgElements.first().attr("data-src");

                                    Elements divContent = elm_row.get(j).getElementsByClass("news-item__content");
                                    if(divContent.size()>0) {
                                        Elements shortCE = divContent.first().getElementsByClass("news-item__sapo");
                                        shortContent = shortCE.html();
                                    }
                                } else {
                                    continue;
                                }

                                ResultSet red = SQLManager.stat.executeQuery("SELECT `id` FROM `tin_tucs` WHERE `slug` LIKE'"+linkNews+"';");
                                if (red != null && red.first()) {
                                    break;
                                } else {
                                    SQLManager.stat.executeUpdate("INSERT INTO `tin_tucs` (`loai_tin_id`, `title`, `image`, `slug`, `short_content`, `isDanTri`) VALUES ("+Integer.parseInt(list1[ik][1])+",'"+title+"','"+urlImage+"','"+linkNews+"','"+shortContent+"', 1);");
                                }
                                Thread.sleep(1000);
                            }
                        }
                }

                for(ik = 0; ik<list1.length; ik++) {
                    Document document = Jsoup.connect(list1[ik][0]).get();
                    Elements elms = document.getElementsByClass("dt-list dt-list--lg");
                    for (int i = 0; i < elms.size(); i++) {
                        Elements elm_row = elms.get(i).getElementsByTag("li");
                        for (int j = 0; j < elm_row.size(); j++) {
                            Elements h3Element = elm_row.get(j).getElementsByTag("h3");

                            Elements imgElement = elm_row.get(j).getElementsByClass("news-item__avatar");

                            Elements divContent = elm_row.get(j).getElementsByClass("news-item__content");

                            if(h3Element.size()>0) {
                                Elements aElements = h3Element.first().getElementsByTag("a");
                                linkNews = aElements.first().absUrl("href");
                                title = aElements.first().attr("title");
                            } else if(imgElement.size()>0){
                                Elements imgElements = imgElement.first().getElementsByClass("no-img");
                                urlImage = imgElements.first().attr("data-src");
                            } else if (divContent.size()>0) {
                                if(divContent.size()>0) {
                                    Elements shortCE = divContent.first().getElementsByClass("news-item__sapo");
                                    shortContent = shortCE.html();
                                }
                            }
                            else {
                                continue;
                            }
                            ResultSet red = SQLManager.stat.executeQuery("SELECT `id` FROM `tin_tucs` WHERE `slug` LIKE'"+linkNews+"';");
                            if (red != null && red.first()) {
                                break;
                            } else {
                                SQLManager.stat.executeUpdate("INSERT INTO `tin_tucs` (`loai_tin_id`, `title`, `image`, `slug`, `short_content`, `isDanTri`) VALUES ("+Integer.parseInt(list1[ik][1])+",'"+title+"','"+urlImage+"','"+linkNews+"','"+shortContent+"', 1);");
                            }
                            Thread.sleep(1000);
                        }
                    }
                }



            } catch (IOException | InterruptedException | SQLException e) {
                e.printStackTrace();
            }


    }



}
