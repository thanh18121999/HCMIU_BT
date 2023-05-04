import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Space,
  Form,
  Input,
  Popconfirm,
  TreeSelect,
  Select,
  message,
} from "antd";
import { updateListItem } from "../Service";

const EditList = ({ onCancel, type, dataToUpdate }) => {
  const [form] = Form.useForm();
  const [dataEdit, setDataEdit] = useState({
    code: dataToUpdate.code,
    description: dataToUpdate.description,
  });
  useEffect(() => {
    setDataEdit(dataToUpdate);
  }, [dataToUpdate]);
  useEffect(() => {
    form.setFieldsValue({ code: dataEdit?.code });
    form.setFieldsValue({ description: dataEdit?.description });
  }, [dataEdit]);
  const onChangeForm = (e) => {
    setDataEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [visible, setVisible] = useState(false);

  const showPopconfirm = () => {
    if (visible == false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const cancel = (e) => {
    setVisible(false);
  };

  const handleEditListItem = async () => {
    if (!dataEdit.code) {
      message.error("Mã không được trống");
    }
    if (dataEdit.code.length > 5) {
      message.error("Mã không được chứ quá 5 ký tự");
    } else if (!dataEdit.description) {
      message.error("Nội dung không được trống");
    } else {
      let res = updateListItem(
        dataEdit.code,
        dataEdit.description,
        type,
        onCancel
      );
      if ((res.statuscode = 200)) {
        setVisible(false);
        message.success("Cập nhật thành công");
      } else {
        setVisible(false);
        message.error("Cập nhật thất bại");
      }
    }
  };

  return (
    <>
      <div className="edit-group">
        <Form layout="vertical" name="control-hooks" form={form}>
          <p style={{ fontWeight: "bold" }}>Mã: {dataEdit.code}</p>
          <Form.Item
            label="Nội dung"
            name="description"
            rules={[
              {
                required: true,
                message: "Nội dung không được trống!",
              },
            ]}
          >
            <Input
              name="description"
              placeholder="Nhập nội dung"
              onChange={onChangeForm}
              value={dataEdit.description}
            />
          </Form.Item>
          <Form.Item>
            <Space
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button type="primary" onClick={onCancel}>
                Hủy
              </Button>
              <Popconfirm
                title="Xác nhận chỉnh sửa?"
                onConfirm={handleEditListItem}
                onCancel={cancel}
                okText="Xác nhận"
                cancelText="Hủy"
                visible={visible}
              >
                <Button type="primary" onClick={showPopconfirm}>
                  Cập nhật
                </Button>
              </Popconfirm>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditList;
