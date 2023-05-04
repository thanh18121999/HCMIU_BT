import React, { useState } from "react";
import { Button, Space, Form, Input, message } from "antd";
import { createListItem } from "../Service";

const CreateList = ({ onCancel, type }) => {
  const [form] = Form.useForm();
  const [dataCreate, setDataCreate] = useState({
    code: "",
    description: "",
  });

  async function CreateNewListItem() {
    if (!dataCreate.code) {
      message.error("Mã không được trống");
    }
    if (dataCreate.code.length > 5) {
      message.error("Mã không được chứ quá 5 ký tự");
    } else if (!dataCreate.description) {
      message.error("Nội dung không được trống");
    } else {
      let result = await createListItem(
        dataCreate.code,
        dataCreate.description,
        type,
        onCancel
      );
      if ((result.statuscode = 200)) {
        setDataCreate({
          ...dataCreate,
          code: "",
          description: "",
        });
        form.resetFields(["code"]);
        form.resetFields(["description"]);
        message.success("Thêm danh mục thành công");
      } else {
        message.error("Thêm danh mục thất bại");
      }
    }
  }
  return (
    <div className="create-group">
      <Form
        layout="vertical"
        name="control-hooks"
        form={form}
        onFinish={CreateNewListItem}
      >
        <Form.Item
          label="Mã"
          name="code"
          rules={[
            {
              required: true,
              message: "Mã không được trống!",
            },
          ]}
        >
          <Input
            name="CODE"
            placeholder="Nhập mã"
            onChange={(e) =>
              setDataCreate({ ...dataCreate, code: e.target.value })
            }
          />
        </Form.Item>
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
            name="DESCRIPTION"
            placeholder="Nhập nội dung"
            onChange={(e) =>
              setDataCreate({ ...dataCreate, description: e.target.value })
            }
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
            <Button type="primary" htmlType="submit">
              Tạo mục mới
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateList;
