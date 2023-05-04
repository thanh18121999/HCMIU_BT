import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Select, Space, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  getPositionList,
  getTitleList,
  getDepartmentList,
  deleteListItem,
} from "../Service";
import CreateList from "./CreateList";
import EditList from "./EditList";

const ListManagement = () => {
  const [listType, setListType] = useState("position");
  const [listName, setListName] = useState("Chức vụ");
  const [listData, setListData] = useState();
  async function getListAPI() {
    if (listType == "position") {
      let res = await getPositionList();
      if (res) {
        setListData(
          res.responses.map((x, index) => ({
            ...x,
            key: index,
            ordinal: index + 1,
          }))
        );
      }
    }
    if (listType == "title") {
      let res = await getTitleList();
      if (res) {
        setListData(
          res.responses.map((x, index) => ({
            ...x,
            key: index,
            ordinal: index + 1,
          }))
        );
      }
    }
    if (listType == "department") {
      let res = await getDepartmentList();
      if (res) {
        setListData(
          res.responses.map((x, index) => ({
            ...x,
            key: index,
            ordinal: index + 1,
          }))
        );
      }
    }
  }
  useEffect(() => {
    getListAPI();
  }, [listType]);
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "ordinal",
      align: "center",
      width: "10%",
    },
    {
      title: "Mã",
      dataIndex: "code",
      align: "center",
      width: "20%",
    },
    {
      title: "Chi tiết",
      dataIndex: "description",
      align: "center",
      width: "60%",
    },
    {
      title: "",
      dataIndex: "DETAIL",
      align: "center",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <span>
              <EditOutlined
                onClick={() => {
                  handleFormEdit(record);
                }}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#000000",
                }}
              />
            </span>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "LOCK",
      align: "center",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <span>
              <DeleteOutlined
                onClick={() => {
                  showModal();
                  setDataDelete(record);
                }}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "red",
                }}
              />
            </span>
          </>
        );
      },
    },
  ];
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleConfirmNew, setVisibleConfirmNew] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const [dataDelete, setDataDelete] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFormEdit = (e) => {
    setVisibleEdit(true);
    setDataEdit(e);
  };
  const handleFormConfirmNew = () => {
    setVisibleConfirmNew(true);
  };
  const handleCancelEdit = () => {
    setVisibleEdit(false);
    getListAPI();
  };
  const handleCancelConfirmNew = () => {
    setVisibleConfirmNew(false);
  };
  const handleFormNew = () => {
    setVisibleConfirmNew(false);
    setVisibleNew(true);
  };
  const handleCancelNew = () => {
    setVisibleNew(false);
    getListAPI();
  };
  async function deleteListItemAPI() {
    let res = await deleteListItem(dataDelete.code, listType);
    if (res.message == "DELETE_SUCCESSFUL") {
      handleCancel();
      getListAPI();
      message.success("Xóa thành công");
    } else if (res.message == "DELETE_FAIL") {
      handleCancel();
      message.error("Xoá thất bại");
    }
  }
  return (
    <>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
        }}
      >
        <h1 className="text-secondary pt-3" style={{ fontSize: "2rem" }}>
          Quản lý danh mục
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "1.3rem",
        }}
      >
        <h1 className="text-secondary pt-3" style={{ fontSize: "1.5rem" }}>
          <div>Chọn danh mục</div>
        </h1>
        <Button type="primary" onClick={handleFormConfirmNew}>
          Tạo danh mục mới
        </Button>
      </div>
      <Select
        style={{ width: "98.5%", marginBottom: "2rem" }}
        placeholder="Chọn danh sách"
        defaultValue={"position"}
        options={[
          { value: "position", label: "Chức vụ" },
          { value: "title", label: "Học vị" },
          { value: "department", label: "Bộ môn" },
        ]}
        onChange={(e) => {
          setListType(e);
          if (e == "position") setListName("Chức vụ");
          else if (e == "title") setListName("Học vị");
          else setListName("Bộ môn");
        }}
      />
      <Table
        size="middle"
        style={{ paddingRight: "20px" }}
        columns={columns}
        bordered
        pagination={{
          pageSize: 5,
        }}
        dataSource={listData}
      />
      <Modal
        //title={<h5 className="text-secondary">Bài viết mới</h5>}
        centered
        visible={visibleConfirmNew}
        width={930}
        onCancel={handleCancelConfirmNew}
        footer={false}
      >
        <p>Tạo mới trong danh mục "{listName}"?</p>
        <Space style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={handleCancelConfirmNew}>
            Hủy
          </Button>
          <Button type="primary" onClick={handleFormNew}>
            Xác nhận
          </Button>
        </Space>
      </Modal>
      <Modal
        title={<h5 className="text-secondary">{listName} mới</h5>}
        centered
        visible={visibleNew}
        width={930}
        onCancel={handleCancelNew}
        footer={false}
      >
        <CreateList type={listType} onCancel={handleCancelNew} />
      </Modal>
      <Modal
        title={<h5 className="text-secondary">Chỉnh sửa danh mục</h5>}
        centered
        visible={visibleEdit}
        width={800}
        onCancel={handleCancelEdit}
        footer={false}
      >
        <EditList
          type={listType}
          dataToUpdate={dataEdit}
          onCancel={handleCancelEdit}
        />
      </Modal>
      <Modal
        title="Xóa bài viết"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <p>
          Xác nhận xóa mục với mã "{dataDelete?.code}" trong danh mục "
          {listName}"?
        </p>
        <Space style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={handleCancel}>
            Hủy
          </Button>
          <Button type="primary" onClick={deleteListItemAPI}>
            Xác nhận
          </Button>
        </Space>
      </Modal>
    </>
  );
};

export default ListManagement;
