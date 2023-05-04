import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Alert, Button, Modal, Select, message } from "antd";
import UserManagement from "./UserManagement";
import ArticleManagement from "./ArticleManagement";
import PageManagement from "./PageManagement";
import BlogManagement from "./BlogManagement";
import ImageGallery from "./FileManagement";
import ChangePassword from "./ChangePassword";
import { getMenuList, getMenuListByRole } from "../Service";
import ListManagement from "./ListManagement";

const { TabPane } = Tabs;

const MainPage = () => {
  var userrole = sessionStorage.getItem("roleuser");
  var userActive = sessionStorage.getItem("isActive").split(",");
  const [menuList, setMenuList] = useState([]);
  const [menuPageList, setMenuPageList] = useState([]);
  async function getMenuListAPI() {
    let res = await getMenuList();
    if (res) {
      var userMenu = sessionStorage.getItem("menuList").split(",");
      setMenuList(
        res.responses
          .filter(
            (x) =>
              x.isActive == 1 &&
              x.isPage == 0 &&
              userMenu.indexOf(x.id.toString()) > -1
          )
          .map((x, index) => ({
            ...x,
            ordinal: index + 1,
          }))
      );
      setMenuPageList(
        res.responses
          .filter(
            (x) =>
              x.isActive == 1 &&
              x.isPage == 1 &&
              userMenu.indexOf(x.id.toString()) > -1
          )
          .map((x, index) => ({
            ...x,
            ordinal: index + 1,
          }))
      );
    }
  }
  sessionStorage.setItem("menuspage", JSON.stringify(menuPageList));
  //sessionStorage.setItem("menus", JSON.stringify(menuList));

  useEffect(() => {
    getMenuListAPI();
  }, []);
  useEffect(() => {
    findChild();
  }, [menuList]);

  function findChild() {
    //var menus = [];
    if (menuList.length > 0) {
      // var maxLevel = Math.max.apply(
      //   Math,
      //   menuList?.map((x) => x.menulevel)
      // );
      var obj = [];
      for (var i = 0; i < menuList.length; i++) {
        obj.push({
          level: menuList[i].menulevel,
          parent: menuList[i].parent,
          value: menuList[i].id,
          title: menuList[i].name,
          children: [],
        });
      }
      // while (maxLevel > 0) {
      //   var tmp = obj.filter((x) => x.level == maxLevel);
      //   maxLevel--;
      //   var tmpbefore = obj.filter((x) => x.level == maxLevel);
      //   Object.keys(tmp).forEach((el) => {
      //     var o = tmp[el];
      //     var parent = o.parent;
      //     if (parent > 0) {
      //       let ch = tmpbefore.find((x) => x.value == parent);
      //       if (ch != undefined) {
      //         tmpbefore.find((x) => x.value == parent).children.push(o);
      //       }
      //     }
      //   });
      // }
      // var minLevel = Math.min.apply(
      //   Math,
      //   menuList?.map((x) => x.menulevel)
      // );
      // console.log(obj, "obj");
      // menus = obj.filter((x) => x.level.toString() == minLevel.toString());
      //menus = obj;
      sessionStorage.setItem("menus", JSON.stringify(obj));
    }
  }

  let navigate = useNavigate();
  function handleLogout() {
    sessionStorage.setItem("iduser", []);
    sessionStorage.setItem("username", []);
    sessionStorage.setItem("menuList", []);
    sessionStorage.setItem("menus", []);
    sessionStorage.setItem("menuspage", []);
    sessionStorage.setItem("isActive", []);
    sessionStorage.setItem("roleuser", []);
    sessionStorage.setItem("listrole", []);
    sessionStorage.setItem("listroledescription", []);
    sessionStorage.setItem("token", []);
    sessionStorage.setItem("pageVNAvailable", []);
    sessionStorage.setItem("pageENAvailable", []);
    navigate("./*");
  }
  const [visibleChangePassword, setVisibleChangePassword] = useState(false);
  const handleFormChangePassword = () => {
    setVisibleChangePassword(true);
  };
  const handleCancelChangePassword = () => {
    setVisibleChangePassword(false);
  };
  const [visible, setVisible] = useState(false);
  const [listRole, setListRole] = useState([]);
  const [choSenRole, setChosenRole] = useState();
  const [roleChange, setRoleChange] = useState();
  useEffect(() => {
    setListRole(
      sessionStorage.getItem("listroledescription")
        ? JSON.parse(sessionStorage.getItem("listroledescription"))
        : []
    );
  }, []);
  function handleChangeRole() {
    setVisible(true);
  }
  function cancelChooseRole() {
    setVisible(false);
  }
  async function handleChangeSelect(e) {
    setRoleChange(e);
    let roleChosen = await getMenuListByRole(roleChange);
    setChosenRole(roleChosen.responses.map((x) => x.description));
  }
  async function confirmChangeRole() {
    if (!roleChange) {
      message.error("Hãy chọn quyền để đổi");
    } else {
      sessionStorage.setItem("roleuser", roleChange);
      let menuSelect = await getMenuListByRole(
        sessionStorage.getItem("roleuser")
      );
      sessionStorage.setItem(
        "menuList",
        menuSelect.responses.map((x) => x.menuid)
      );
      setVisible(false);
      window.location.reload();
    }
  }
  return (
    <>
      {userActive?.includes("1") ? (
        <>
          <Tabs
            tabPosition="top"
            style={{
              paddingRight: "2em",
              paddingLeft: "2em",
              justifyContent: "flex-end",
            }}
          >
            <TabPane tab="Tài khoản" key="0">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  type="default"
                  style={{ color: "red", marginRight: "1rem" }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
                <Button
                  type="default"
                  style={{ color: "blue", marginRight: "1rem" }}
                  onClick={handleFormChangePassword}
                >
                  Đổi mật khẩu
                </Button>
                <Modal
                  title={<h5 className="text-secondary">Đổi mật khẩu</h5>}
                  centered
                  visible={visibleChangePassword}
                  width={800}
                  onCancel={handleCancelChangePassword}
                  footer={false}
                >
                  <ChangePassword onCancel={handleCancelChangePassword} />
                </Modal>
                {sessionStorage.getItem("listrole")?.indexOf(",") > 1 ? (
                  <Button
                    type="default"
                    style={{ color: "blue", marginRight: "1rem" }}
                    onClick={handleChangeRole}
                  >
                    Đổi quyền
                  </Button>
                ) : null}
                <Modal
                  title={<h5 className="text-secondary">Chọn quyền</h5>}
                  centered
                  visible={visible}
                  width={800}
                  footer={false}
                  onCancel={cancelChooseRole}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn quyền"
                    optionLabelProp="children"
                    onChange={(e) => handleChangeSelect(e)}
                  >
                    {listRole?.map((value) => {
                      return (
                        <Select.Option
                          key={value.code}
                          value={value.code}
                          label={value.code + "-" + value.description}
                        >
                          {value.code} - {value.description}
                        </Select.Option>
                      );
                    })}
                  </Select>

                  <Button
                    type="primary"
                    style={{ marginTop: "2rem", marginLeft: "41.5rem" }}
                    onClick={confirmChangeRole}
                  >
                    Xác nhận
                  </Button>
                </Modal>
              </div>
              <UserManagement />
            </TabPane>
            {userrole.startsWith("LE") ? null : (
              <TabPane tab="Trang" key="1">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button
                    type="default"
                    style={{ color: "red" }}
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </div>
                <PageManagement />
              </TabPane>
            )}

            <TabPane tab="Bài viết" key="2">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  type="default"
                  style={{ color: "red" }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
              <ArticleManagement />
            </TabPane>
            <TabPane tab="Bài viết cá nhân" key="3">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  type="default"
                  style={{ color: "red" }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
              <BlogManagement />
            </TabPane>

            {userrole != "ADMI" ? null : (
              <TabPane tab="Quản lý danh mục" key="4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button
                    type="default"
                    style={{ color: "red" }}
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </div>
                <ListManagement />
              </TabPane>
            )}
            <TabPane tab="Kho lưu trữ" key="5">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  type="default"
                  style={{ color: "red" }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
              <ImageGallery />
            </TabPane>
          </Tabs>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10em",
            }}
          >
            <Alert
              message="Error"
              description="Tài khoản đang bị khóa và không thể thao tác các chức năng. Vui lòng liên hệ quản trị viên để biết thêm chi tiết."
              type="error"
              showIcon
            />
          </div>
          <div
            style={{
              display: "flex",
              paddingTop: "2em",
              paddingRight: "2em",
              paddingLeft: "2em",
              justifyContent: "center",
            }}
          >
            <Button
              type="default"
              style={{ color: "red" }}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </div>
        </>
      )}
    </>
  );
};
export default MainPage;
