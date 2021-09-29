import React from "react";
import { Link } from "react-router-dom";
// import { useRouter } from 'next/router'
import "./style.scss";
function index(props) {
  // const router = useRouter();
  const getBreadcrumbs = () => {
    let url = (window.location.pathname || "").toLowerCase();
    let obj = [];
    switch (url) {
      case "/":
      case "/admin/dashboard":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin/Dashboard",
            name: "Dashboard",
          },
        ];
        break;
      case "/admin/danh-sach-bai-viet":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/tin-tuc",
            name: "Bài viết",
          },
        ];
        break;
      case "/thong-bao":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "",
            name: "Home",
          },
          {
            url: "/thong-bao",
            name: "Thông báo",
          },
        ];
        break;
      case "/admin/danh-sach-the-loai":
        obj = [
          {
            url: "/admin/danh-sach-the-loai",
            name: "Danh sách thể loại",
          },
        ];
        break;
      case "/admin/covid-19":
        obj = [
          {
            url: "/admin/covid-19",
            name: "Covid 19",
          },
        ];
        break;
      default:
        if (url.indexOf("/admin/bai-viet/chinh-sua") === 0) {
          obj = [
            {
              url: "/admin/danh-sach-bai-viet",
              name: "Bài viết",
            },
            {
              name: "chỉnh sửa tin tức",
            },
          ];
        }
        if (url.indexOf("/admin/bai-viet/them-moi") === 0) {
          obj = [
            {
              url: "/admin/danh-sach-bai-viet",
              name: "Bài viết",
            },
            {
              name: "Thêm mới tin tức",
            },
          ];
        }
        break;
    }
    return obj;
  };

  // console.log(window.location.pathname);
  const breadCrumb = getBreadcrumbs();
  return (
    <ol className="breadcrumb bg-info-400">
      {breadCrumb.map((item, index) => {
        if (index < breadCrumb.length - 1)
          return (
            <li className="breadcrumb-item" key={index}>
              <Link to={item.url || "#"} className="text-white">
                {item.icon && <i className="fal fa-home mr-1"></i>}
                {item.name}
              </Link>
            </li>
          );
        return (
          <li className="breadcrumb-item active text-white" key={index}>
            {item.name}
          </li>
        );
      })}
    </ol>
  );
}
export default index;
